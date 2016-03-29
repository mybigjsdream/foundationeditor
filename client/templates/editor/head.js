/**
 * Created by dengjing on 16/3/7.
 */
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
                this.$('.editor-content').text(text);
            });
        }else{
            Template.instance().subscribe('cache_md', userId, () => {
                let cursor = cache_md.find({'userId': userId}, {sort: {cTime: -1}});
                let cache_object = cursor.fetch()[0];
                if(cache_object){
                    this.templateDictionary.set('text', cache_object['raw_html']);
                    this.$('.editor-content').text(cache_object['raw_html']);
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
    }
);

Template.head.onDestroyed(
    () => {
        clearInterval(interval);
    }
);

Template.head.events({
    'click #blog-home': (e) => {
        FlowRouter.go('/blog');
    },
    'click #fi-time': (e) => {
        if(Meteor.userId() == null){
            return;
        }
        let userId = Meteor.userId() || '';
        try {
            text = cache_md.find({'userId': userId}, {sort: {cTime: -1}}).fetch()[0]['raw_html'];
        } catch (e) {
            console.log(e);
            cache_md.insert({
                userId: userId,
                raw_html: text,
                cTime: new Date().getTime()
            });
            return;
        }
        let react_text = this.templateDictionary.get('text');
        if(react_text != text && react_text.split('\n').join('') != ''){
            cache_md.insert({  //这个操作 估计得放放服务器端
                userId: userId,
                raw_html: react_text,
                cTime: new Date().getTime()
            });
        }
    },
    'click #fi-arrow-left': (e) => {
        if(Meteor.userId() == null){
            alert('需要登陆');
            return;
        }
        let userId = Meteor.userId();
        let cursor = cache_md.find({'userId': userId}, {sort: {cTime: -1}});
        let cache_objects = cursor.fetch();
        if(cache_objects[1]){
            cache_md.remove({_id: cache_objects[0]._id});
            this.$('.editor-content').text(cache_objects[1]['raw_html']);
            this.templateDictionary.set('text', cache_objects[1]['raw_html']);
        }
    },
    'click #fi-monitor': (e) => {
        let userId = Meteor.userId() || '';
        let base_content = this.$('.base-content')[0].children;
        let url_path = new Date().toLocaleDateString() + '/' + this.$('#entitle')[0].value;
        let id = CryptoJS.MD5(url_path + userId).toString(); //逻辑应该是没登录的不能发表别的匿名用户已经发表过的主题
        var article = {
            id: id,
            userId: userId,
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
                        userId: article.userId,
                        cTime: new Date().getTime(),
                        updateTime: new Date().getTime()
                    });
                    FlowRouter.go(`/blog/${id}`);
                }else{
                    if(!status.is_login){
                        alert('已有匿名用户发表此主题');
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