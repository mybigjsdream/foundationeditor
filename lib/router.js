/**
 * Created by dengjing on 16/1/26.
 */
/*
Router.route('/', {
    name: 'layout',
    layoutTemplate: 'layout',
    //waitOn: () => {
    //    return [
    //        Meteor.subscribe('cache_md'),
    //        Meteor.subscribe('publish_article')
    //    ];
    //},
    //action: () => {
    //    this.render('head');
    //}
});
*/


FlowRouter.route('/', {
    action: () => {
        console.log("Yeah! We are on the flowrouter.");
        BlazeLayout.render('layout');
    }
});
