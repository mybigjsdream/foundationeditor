/**
 * Created by dengjing on 16/1/26.
 */
Router.route('/', {
    name: 'layout',
    layoutTemplate: 'layout',
    //waitOn: () => {
    //    return Meteor.subscribe('articles');
    //}
});