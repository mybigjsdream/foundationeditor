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
Meteor.methods({
    validatePublishArticle: (article) => {
        check(article, {
            id: String,
            url_path: String,
            title: String,
            text: String
        });
        let path_re = new RegExp('\\d+/\\d+/\\d+/\\w+-.*');
        console.log(path_re.test(article.url_path));
        if(path_re.test(article.url_path)){ //等待之后更多的校验
            return true;
        }else{
            return false;
        }
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
