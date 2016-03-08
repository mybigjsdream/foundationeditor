/**
 * Created by dengjing on 16/3/7.
 */

publish_article = new Mongo.Collection('publish_article');
publish_article.allow({
    insert: () => {
        return true;
    },
    update: () => {
        return true;
    }
});

cache_article = new Mongo.Collection('cache_article');
cache_article.allow({
    insert: () => {
        return true;
    },
    update: () => {
        return true;
    }
});
