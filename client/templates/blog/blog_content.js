/**
 * Created by dengjing on 16/3/15.
 */

//var blog_content = '';

Template.blog_content.onCreated(() => {
    this.blogDictionary = new ReactiveDict();
    Template.instance().autorun(() => {
        let blog_id = FlowRouter.getParam('id');
        console.log(blog_id);
        Template.instance().subscribe('publish_article', blog_id, () => {
            let cursor = publish_article.find({_id: blog_id});
            let one = cursor.fetch()[0];
            if(one){
                //blog_content = one.text;
                this.blogDictionary.set('text', one.text);
                this.blogDictionary.set('title', one.title);
                this.blogDictionary.set('cTime', one.cTime);
                this.blogDictionary.set('updateTime', one.updateTime);
                this.blogDictionary.set('userName', one.userName);
            }else{
                FlowRouter.go('/404');
            }
        });
    });
});

Template.blog_content.helpers({
    blog_title: () => {
        return this.blogDictionary.get('title');
    },
    blog_text: () => {
        return this.blogDictionary.get('text');
    },
    blog_ct: () => {
        return this.blogDictionary.get('cTime');
    },
    blog_ut: () => {
        return new Date(parseInt(this.blogDictionary.get('updateTime'))).toLocaleString();
    },
    blog_user: () => {
        return this.blogDictionary.get('userName');
    }
});
