/**
 * Created by dengjing on 16/3/7.
 */
var interval;

Template.head.onCreated(
    () => {
        //this.templateDictionary = new ReactiveDict();
        //console.log(this.$('a:has:(i.fi-arrow-left)'));
    }
);

Template.head.onRendered(
    () => {
        var mockClick = () => {
            this.$('.fi-minus')[0].click();
        };
        interval = setInterval(mockClick, 10000);
    }
);

Template.head.onDestroyed(
    () => {
        clearInterval(interval)
    }
);

Template.head.events({
    'click .fi-monitor': (e) => {
        let baseNode = this.$('.base-content');
        var raw_html;
        if(baseNode.length < 1){
            ;
        }else{
            raw_html = baseNode[0].outerHTML;
            //console.log(raw_html);
        }
        publish_article.insert({
            raw_html: raw_html,
            cTime: new Date().getTime()
        });
    },
    'click .fi-minus': (e) => {
        let raw_html = this.$('.base-content')[0].outerHTML;
        cache_article.insert({
            raw_html: raw_html,
            cTime: new Date().getTime()
        });
    }
});