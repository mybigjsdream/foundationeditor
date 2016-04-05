/**
 * Created by dengjing on 16/4/5.
 */

Template.blog_page.onCreated(
    () => {
        //console.log(FlowRouter.getParam('page'));
        Template.instance().autorun(() => {
            Template.instance().subscribe('publish_article');
        });
    }
);

Template.blog_page.helpers({
    page_count_small: () => {
        let articles_count = publish_article.find().count();
        //console.log(Math.ceil(articles_count/page_size));
        let page = Math.ceil(articles_count/page_size);
        return page < 1;
    },
    page_count_mildle_1: () => {
        let articles_count = publish_article.find().count();
        let page = Math.ceil(articles_count/page_size);
        return page == 1;
    },
    page_count_mildle_2: () => {
        let articles_count = publish_article.find().count();
        let page = Math.ceil(articles_count/page_size);
        return page == 2;
    },
    page_count_mildle_3: () => {
        let articles_count = publish_article.find().count();
        let page = Math.ceil(articles_count/page_size);
        return page == 3;
    },
});