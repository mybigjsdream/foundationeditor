/**
 * Created by dengjing on 16/3/8.
 */
Meteor.publish('publish_article', (id, category, userName) => {
    //check(id, String);
    if(id == null && category == null && userName == null)
        return publish_article.find();
    if(id) {
        return publish_article.find({'_id': id});
    }
    if(userName) {
        return publish_article.find({'userName': userName});
    }
    if(category) {
        let category_ids = article_category_view.find({'category': category});
        let ids = [];
        category_ids.forEach((o) => {
            ids.push(o.id);
        });
        return publish_article.find({'_id': {$in: ids}});
    }
});

Meteor.publish('cache_md', (userId, tmp) => {
    //let userId = Meteor.userId();
    //console.log(userId);
    if(userId != null){
        let o = Meteor.users.findOne({'_id': userId});
        if(o){
            //console.log(o);
            return cache_md.find({'$or':[{'userId': userId}, {'userId': tmp}]});
        }
    }else{   // 只是为了易读
        return cache_md.find({'userId': tmp});
    }
});

Meteor.publish('init_md', () => {
    return init_md.find();
});

Meteor.publish('article_author_view', () => {
    return article_author_view.find();
});

Meteor.publish('article_category_view', () => {
    return article_category_view.find();
});