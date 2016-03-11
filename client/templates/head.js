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
        //let raw_html = this.$('.editor-content')[0].innerText;
        this.templateDictionary.set('text', this.$('.editor-content')[0].innerText);
        let text = '';
        try {
            text = cache_md.find({}, {sort: {cTime: -1}}).fetch()[0]['raw_html'];
        } catch (e) {
            console.log(e);
        }
        if(this.templateDictionary.get('text') != text && this.templateDictionary.get('text') != ''){
            let raw_text = this.templateDictionary.get('text');
            cache_md.insert({  //这个操作 估计得放放服务器端
                raw_html: raw_text,
                cTime: new Date().getTime()
            });
        }
    },
    'click .fi-arrow-left': (e) => {
        let cursor = cache_md.find({}, {sort: {cTime: -1}});
        let cache_objects = cursor.fetch();
        if(cache_objects[1]){
            //this.$('.editor-content').text(cache_object['raw_html']);
            //this.templateDictionary.set('text', cache_object['raw_html']);
            cache_md.remove({_id: cache_objects[0]._id});
            this.$('.editor-content').text(cache_objects[1]['raw_html']);
            this.templateDictionary.set('text', cache_objects[1]['raw_html']);
        } else {
            ;
        }
    }
});