/**
 * Created by dengjing on 16/3/25.
 */

Template.blog_head.onCreated(
    () => {
        //var elasticsearch = require('elasticsearch');
        //this.es_client = new elasticsearch.Client({
        //    host: '182.92.220.227:8008',
        //    log: 'trace'
        //});
        //this.es_client.ping({
        //    requestTimeout: 30000,
        //    hello: "elasticsearch"
        //}, function (error) {
        //    if (error) {
        //        console.error('elasticsearch cluster is down!');
        //    } else {
        //        console.log('All is well');
        //    }
        //});
    }
);

Template.blog_head.events({
    'click #blog-home': (e) => {
        FlowRouter.go('/blog');
    },
    'click #blog-editor': (e) => {
        FlowRouter.go('/editor');
    },
    'click #blog-about': (e) => {
        FlowRouter.go('/about');
    },
    'click .button': (e) => {
        let q = this.$('#search-text')[0].value;
        if(q == ''){
            alert('搜索关键字不能为空');
            return;
        }
        Meteor.call('esHandle', q, (e, r) => {
            if(e) {
                console.log(e);
                console.log('error');
            } else {
                let hits = r.data.hits;
                let s = _.map(hits, (h) => h._id).join(',');
                if(s.length == 0) {
                    alert('没找到匹配项');
                    return;
                }
                FlowRouter.go(`/blog?search=${s}`);
            }
        });
    }
});