/**
 * Created by dengjing on 16/3/7.
 */
var interval;

Template.head.onCreated(() => {
    this.headDictionary = new ReactiveDict();
    Template.instance().autorun(() => {
        Template.instance().subscribe('cache_md', () => {
            let cursor = cache_md.find({}, {sort: {cTime: -1}});
            let cache_object = cursor.fetch()[0];
            if(cache_object){
                this.templateDictionary.set('text', cache_object['raw_html']);
                this.$('.editor-content').text(cache_object['raw_html']);
            }
        });
        Template.instance().subscribe('publish_article');
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
        clearInterval(interval)
    }
);

Template.head.events({
    'click .fi-minus': (e) => {
        this.templateDictionary.set('text', this.$('.editor-content')[0].innerText);
        let text = '';
        try {
            text = cache_md.find({}, {sort: {cTime: -1}}).fetch()[0]['raw_html'];
        } catch (e) {
            console.log(e);
        }
        let react_text = this.templateDictionary.get('text');
        if(react_text != text && react_text.split('\n').join('') != ''){
            cache_md.insert({  //这个操作 估计得放放服务器端
                raw_html: react_text,
                cTime: new Date().getTime()
            });
        }
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
        let text = this.templateDictionary.get('text');
        //console.log(this.$('.base-content')[0].outerHTML);
        let head = '';
        if(text.split('\n').join('') == ''){
            FlowRouter.go('/404');
        }else{
            if(text.split('\n').length == 1){
                head = text;
            }else{
                head = text.split('\n')[0];
            }
        }
        //console.log(CryptoJS.MD5(head).toString());
        let html = this.$('.base-content')[0].outerHTML;
        let id = CryptoJS.MD5(head).toString(); //之后可能要根据作者+标题吧 再加时间？
        //console.log(publish_article.findOne({_id: id}));
        let article = publish_article.findOne({_id: id});
        if(!article){
            publish_article.insert({
                _id: id,
                head: head,
                html: html,
                cTime: new Date().getTime()
            });
            FlowRouter.go(`/blog/${id}`);
        }else{
            FlowRouter.go(`/blog/${id}`);
        }
        //console.log(head);
        //publish_article.
        //FlowRouter.go('/blog/123');
    }
});