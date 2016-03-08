/**
 * Created by dengjing on 16/3/8.
 */
Meteor.publish('publish_article', () => {
    //check(id, String);
    return publish_article.find();
});

Meteor.publish('cache_article', () => {
    //check(id, String);
    return cache_article.find();
});