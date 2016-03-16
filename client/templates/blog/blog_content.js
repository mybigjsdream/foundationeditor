/**
 * Created by dengjing on 16/3/15.
 */

var blog_content = '';

Template.blog_content.onCreated(() => {
    this.blogDictionary = new ReactiveDict();
    Template.instance().autorun(() => {
        let blog_id = FlowRouter.getParam('id');
        Template.instance().subscribe('publish_article', () => {
            let cursor = publish_article.find({_id: blog_id});
            let one = cursor.fetch()[0];
            if(one){
                blog_content = one.html;
                this.blogDictionary.set('blog', blog_content);
            }else{
                FlowRouter.go('/404');
            }
        });
    });
});

Template.blog_content.helpers({
    base_content: () => {
        return this.blogDictionary.get('blog');
    }
});
