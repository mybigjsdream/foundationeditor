/**
 * Created by dengjing on 16/3/25.
 */

Template.blog_head.events({
    'click #blog-home': (e) => {
        FlowRouter.go('/blog');
    },
    'click #blog-editor': (e) => {
        FlowRouter.go('/');
    },
    'click #blog-about': (e) => {
        FlowRouter.go('/404');
    },
});