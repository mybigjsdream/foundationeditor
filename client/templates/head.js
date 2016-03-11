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
                //this.headDictionary.set('back_count', 0);
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
        let raw_html = this.$('.editor-content')[0].innerText;
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
            //this.headDictionary.set('back_count', 0);
        }
    },
    'click .fi-arrow-left': (e) => {
        //let count = this.headDictionary.get('back_count') + 1;
        let cursor = cache_md.find({}, {sort: {cTime: -1}});
        //let cache_object = cursor.fetch()[count-1];
        let cache_object = cursor.fetch()[0];
        if(cache_object){
            this.$('.editor-content').text(cache_object['raw_html']);
            //this.headDictionary.set('back_count', count);
            this.templateDictionary.set('text', cache_object['raw_html']);
            cache_md.remove({_id: cache_object._id});
        //} else {
        //    this.headDictionary.set('back_count', count - 1);
        }
    }
});