/**
 * Created by dengjing on 16/3/8.
 */
Meteor.publish('publish_article', (id) => {
    //check(id, String);
    if(id == null)
        return publish_article.find();
    else{
        return publish_article.find({'_id': id});
    }
});

Meteor.publish('cache_md', (userId) => {
    //let userId = Meteor.userId();
    //console.log(userId);
    if(userId != null){
        return cache_md.find({'userId': userId});
    }else{   // 只是为了易读
        return cache_md.find({'userId': ''});
    }
});

Meteor.publish('init_md', () => {
    return init_md.find();
});