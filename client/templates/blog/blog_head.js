/**
 * Created by dengjing on 16/3/25.
 */

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
        Meteor.call('esHandle', q, (e, r) => {
            if(e) {
                console.log(e);
                console.log('error');
            } else {
                let hits = r.data.hits;
                let s = _.map(hits, (h) => h._id).join(',');
                FlowRouter.go(`/blog?search=${s}`);
            }
        });
    }
});