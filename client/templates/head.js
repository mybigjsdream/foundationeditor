/**
 * Created by dengjing on 16/3/7.
 */
var interval;

/*
Template.head.onCreated(function(){  //用箭头函数有坑，我去!!!
        //var self = this;
        window.headDictionary = new ReactiveDict();
        window.headDictionary.set('back_count', 0);
        console.log(this);
        this.autorun(() => {
            this.subscribe('cache_md');
            this.subscribe('publish_article');
        });
    }
);
*/
//Template.head.onCreated(() => {
//    console.log(this);
//});

Template.head.onRendered(
    () => {
        var mockClick = () => {
            this.$('.fi-minus')[0].click();
        };
        interval = setInterval(mockClick, 600000000);
        let cursor = cache_md.find({}, {sort: {cTime: -1}});
        let cache_object = cursor.fetch()[0];
        if(cache_object){
            this.templateDictionary.set('text', cache_object['raw_html']);
            this.$('.editor-content').text(cache_object['raw_html']);
        }
    }
);

Template.head.onDestroyed(
    () => {
        clearInterval(interval)
    }
);

Template.head.events({
    //'click .fi-monitor': (e) => {
    //    let baseNode = this.$('.base-content');
    //    var raw_html;
    //    if(baseNode.length < 1){
    //        ;
    //    }else{
    //        raw_html = baseNode[0].outerHTML;
    //    }
    //    publish_article.insert({
    //        raw_html: raw_html,
    //        cTime: new Date().getTime()
    //    });
    //},
    'click .fi-minus': (e) => {
        let raw_html = this.$('.editor-content')[0].innerText;
        console.log(this.$('.editor-content'));
        let text = '';
        try {
            text = cache_md.find({}, {sort: {cTime: -1}}).fetch()[0]['raw_html'];
        } catch (e) {
            console.log(e);
        }
        if(raw_html != text && raw_html != ''){
            cache_md.insert({  //这个操作 估计得放放服务器端
                raw_html: raw_html,
                cTime: new Date().getTime()
            });
            this.headDictionary.set('back_count', 0);
        }
    },
    'click .fi-arrow-left': (e) => {
        let count = this.headDictionary.get('back_count') + 1;
        let cursor = cache_md.find({}, {sort: {cTime: -1}});
        let cache_object = cursor.fetch()[count-1];
        if(cache_object){
            this.$('.editor-content').text(cache_object['raw_html']);
            this.headDictionary.set('back_count', count);
            this.templateDictionary.set('text', cache_object['raw_html']);
        } else {
            this.headDictionary.set('back_count', count - 1);
        }
    }
});