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

cache_md = new Mongo.Collection('cache_md');
cache_md.allow({
    insert: () => {
        return true;
    },
    update: () => {
        return true;
    },
    remove: () => {
        return true;
    }
});

init_md = new Mongo.Collection('init');
init_md.allow({
    insert: () => {
        return true;
    },
    update: () => {
        return true;
    },
    remove: () => {
        return true;
    }
});

article_author_view = new Mongo.Collection('article_author_view');
article_category_view = new Mongo.Collection('article_category_view');
