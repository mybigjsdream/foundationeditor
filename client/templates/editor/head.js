/**
 * Created by dengjing on 16/3/7.
 */
import uuid from 'node-uuid';
var interval;

Template.head.onCreated(() => {
    this.headDictionary = new ReactiveDict();
    Template.instance().autorun(() => {
        Template.instance().subscribe('publish_article');
        let userId = Meteor.userId();
        if(userId == null){
            Template.instance().subscribe('init_md', () => {  //之后改为加载首页
                let text = init_md.findOne().raw;
                this.templateDictionary.set('text', text);
                this.headDictionary.set('tmp_entitle', 'WelcomeToUesMeteor-test');
                this.headDictionary.set('uuid', uuid.v4()); //匿名用户编辑时的唯一id，页面销毁时消除
                this.$('.editor-content').text(text);
                this.$('#entitle').val('WelcomeToUesMeteor-test');
            });
            Template.instance().subscribe('cache_md', userId, this.headDictionary.get('uuid'));
        }else{
            Template.instance().subscribe('cache_md', userId, this.headDictionary.get('uuid'), () => {
                let cursor = cache_md.find({'userId': userId}, {sort: {cTime: -1}});
                let cache_object = cursor.fetch()[0];
                if(cache_object){
                    this.templateDictionary.set('text', cache_object['raw_html']);
                    this.headDictionary.set('tmp_entitle', cache_object['entitle']);
                    this.$('.editor-content').text(cache_object['raw_html']);
                    this.$('#entitle').val(cache_object['entitle']);
                }
            });
        }
    });
});

Template.head.onRendered(
    () => {
        var mockClick = () => {
            this.$('#fi-time')[0].click();
        };
        interval = setInterval(mockClick, 1000);
        window.addEventListener('beforeunload', (e) => {
            let c_mds = cache_md.find({'userId': this.headDictionary.get('uuid')});
            c_mds.forEach((c_md) => {
                cache_md.remove({'_id': c_md._id});
            });
            this.headDictionary.set('uuid', '');
        });
    }
);

Template.head.onDestroyed(
    () => {
        clearInterval(interval);
        let c_mds = cache_md.find({'userId': this.headDictionary.get('uuid')});
        c_mds.forEach((c_md) => {
            cache_md.remove({'_id': c_md._id});
        });
        this.headDictionary.set('uuid', '');
    }
);

Template.head.events({
    'click #blog-home': (e) => {
        FlowRouter.go('/blog');
    },
    'click #fi-time': (e) => {
        let userId = Meteor.userId();
        if(userId == null){
            userId = this.headDictionary.get('uuid');
        }
        let entitle = this.$('#entitle')[0].value;
        let text = this.templateDictionary.get('text') || '';
        try {
            text = cache_md.find({'userId': userId}, {sort: {cTime: -1}}).fetch()[0]['raw_html'];
        } catch (e) {
            console.log('用户首次登录');
            console.log(e);
            cache_md.insert({
                userId: userId,
                entitle: entitle,
                raw_html: text,
                cTime: new Date().getTime()
            });
        }
        let react_text = this.templateDictionary.get('text');
        let react_entitle = this.headDictionary.get('tmp_entitle');
        if((react_text != text && react_text.split('\n').join('') != '') || entitle != react_entitle){
            cache_md.insert({  //这个操作 估计得放放服务器端
                userId: userId,
                entitle: entitle,
                raw_html: react_text,
                cTime: new Date().getTime()
            });
            this.headDictionary.set('tmp_entitle', entitle);  //也可以模仿 react_text 监控input事件
        }
    },
    'click #fi-arrow-left': (e) => {
        let userId = Meteor.userId();
        if(userId == null){
            userId = this.headDictionary.get('uuid');
        }
        let cursor;
        try {
            cursor = cache_md.find({'userId': userId}, {sort: {cTime: -1}});
        } catch (e) {
            alert('还没有缓存');
            console.log(e);
            return;
        }
        let cache_objects = cursor.fetch();
        if(cache_objects[1]){
            cache_md.remove({_id: cache_objects[0]._id});
            this.$('.editor-content').text(cache_objects[1]['raw_html']);
            this.$('#entitle').val(cache_objects[1]['entitle']);
            this.templateDictionary.set('text', cache_objects[1]['raw_html']);
            this.headDictionary.set('tmp_entitle', cache_objects[1]['entitle']);
        }
    },
    'click #fi-monitor': (e) => {
        let user = Meteor.user();
        let userName = '';
        if(user == null)
            userName = '匿名';
        else{
            if (user.profile && user.profile.name)  //这一部分  记得重构
                userName = user.profile.name;
            else
                userName = user.emails[0].address;
        }
        let base_content = this.$('.base-content')[0].children;
        let Categories = this.$('#entitle')[0].value.toString().split('-').slice(1);
        let url_path = new Date().toLocaleDateString() + '/' + this.$('#entitle')[0].value.toString().split('-')[0];
        let id = CryptoJS.MD5(url_path + userName).toString(); //逻辑应该是没登录的不能发表别的匿名用户已经发表过的主题
        var article = {
            id: id,
            userName: userName,
            Categories: Categories,
            url_path: url_path,
            title: base_content[0].outerHTML,
            text: Array.from(base_content, x => x.outerHTML).splice(1).join('')
        };
        Meteor.call('validatePublishArticle', article, function(error, status){
            if(error){
                throwError(error.reason);
                FlowRouter.go('/404');
            }
            console.log(status);
            if(status.url_test){
                let one = publish_article.findOne({_id: article.id});
                if(!one){
                    publish_article.insert({
                        _id: article.id,
                        title: article.title,
                        text: article.text,
                        urlPath: article.url_path,
                        userName: article.userName,
                        cTime: new Date().getTime(),
                        updateTime: new Date().getTime()
                    });
                    FlowRouter.go(`/blog/${id}`);
                }else{
                    if(!status.is_login){
                        alert('今天已有匿名用户发表此主题');
                        return;
                    }
                    publish_article.update(  //做用户的校验
                        {_id: id},
                        {
                            $set: {
                                title: article.title,
                                text: article.text,
                                updateTime: new Date().getTime()
                            }
                        }
                    );
                    FlowRouter.go(`/blog/${id}`);
                }
            }else{
                alert('英文标题为必填项');
                this.$('#entitle').css('border-color', 'red');
            }
        });
    }
});

Template.head.helpers({
    weibo: () => {
        let share = '<wb:share-button appkey="2953312031" addition="simple" ' +
                    'type="button" default_text=":)"></wb:share-button>';
        return share;
    }
});
