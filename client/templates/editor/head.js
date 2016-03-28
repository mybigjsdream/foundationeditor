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
            Template.instance().subscribe('cache_md', userId, () => {  //之后改为加载首页
                let url = 'http://cdn.sinacloud.net/shanyue/md.md?KID=sina,2e6td2rpfE1K84lqGCNA&Expires=1459133280&ssig=qkaKgO1ts6';
                HTTP.get(url, (e, r) => {
                    if(e) {
                        alert(e);
                    }
                    if(r.statusCode != 200) {
                        alert('网络错误'+r.statusCode);
                    }
                    this.templateDictionary.set('text', r.content);
                    this.$('.editor-content').text(r.content);
                });
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
            this.$('.fi-minus')[0].click();
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
    'click .fi-minus': (e) => {
        this.templateDictionary.set('text', this.$('.editor-content')[0].innerText);
        let text = '';
        try {
            text = cache_md.find({}, {sort: {cTime: -1}}).fetch()[0]['raw_html'];
        } catch (e) {
            console.log(e);
        }
        let react_text = this.templateDictionary.get('text');
        let userId = Meteor.userId() || '';
        if(react_text != text && react_text.split('\n').join('') != ''){
            cache_md.insert({  //这个操作 估计得放放服务器端
                userId: userId,
                raw_html: react_text,
                cTime: new Date().getTime()
            });
        }
    },
    'click .fi-bold': (e) => {
        let url = 'https://raw.githubusercontent.com/mybigjsdream/mymarkhtml/master/README.md';
        HTTP.get(url, (e, r) => {
            if(e){
                console.log(e);
            }
            let text = r;
            console.log(text);
        });
    },
    'click .fi-arrow-left': (e) => {
        let cursor = cache_md.find({}, {sort: {cTime: -1}});
        let cache_objects = cursor.fetch();
        if(cache_objects[1]){
            cache_md.remove({_id: cache_objects[0]._id});
            this.$('.editor-content').text(cache_objects[1]['raw_html']);
            this.templateDictionary.set('text', cache_objects[1]['raw_html']);
        }
    },
    'click .fi-monitor': (e) => {
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
                this.$('#entitle').css('border-color', 'red');
            }
        });
    }
});