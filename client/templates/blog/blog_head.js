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
        const url = `http://182.92.220.227:8088/es/search?q=${q}`;
        console.log(url);
        Meteor.http.get(url, (e, r) => {
            if(e)
                console.log('http get FAILED!');
            else{
                console.log('success' + r);
            }
        });
    }
});