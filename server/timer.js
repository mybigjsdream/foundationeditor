/**
 * Created by dengjing on 16/4/8.
 */

if(publish_article.find().count() != 0) {
    var collection_author_date = () => {
        let ones = publish_article.find({}).fetch();
        ones.forEach((one) => {
            if(article_author_view.findOne({_id: one._id})){
                return;
            }
            article_author_view.insert({
                _id: one._id,
                userName: one.userName
            });
        });
    };
    var collection_catrgory_date = () => {
        let ones = publish_article.find({}).fetch();
        ones.forEach((one) => {
            one.Categories.forEach((o) => {
                if(article_category_view.findOne({_id: one._id+o})){
                    return;
                }
                article_category_view.insert({
                    _id: one._id+o,
                    id: one._id,
                    category: o
                });
            });
        });
    };
    setInterval(Meteor.bindEnvironment(collection_author_date), 10000);
    setInterval(Meteor.bindEnvironment(collection_catrgory_date), 10000);
}