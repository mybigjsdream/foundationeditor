/**
 * Created by dengjing on 16/1/26.
 */
Router.route('/', {
    name: 'layout',
    layoutTemplate: 'layout',
    waitOn: () => {
        return [
            Meteor.subscribe('publish_article'),
            Meteor.subscribe('cache_article')
        ];
        //return Meteor.subscribe('publish_article', '1');
    }
});