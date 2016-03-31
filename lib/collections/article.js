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
            Categories: [String],
            title: String,
            text: String,
            userName: String
        });
        var status = {};
        let path_re = new RegExp('\\d+/\\d+/\\d+/\\w+');
        if(path_re.test(article.url_path)){ //等待之后更多的校验
            status.url_test = true;
        }else{
            status.url_test = false;
        }
        if(article.userName == '匿名'){
            status.is_login = false;
        }else{
            status.is_login = true;
        }
        return status;
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
