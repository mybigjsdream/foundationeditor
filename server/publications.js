/**
 * Created by dengjing on 16/3/8.
 */
Meteor.publish('publish_article', () => {
    //check(id, String);
    return publish_article.find();
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

Meteor.publish('init', () => {
    return init_md.find();
});