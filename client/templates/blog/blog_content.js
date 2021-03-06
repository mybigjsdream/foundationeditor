/**
 * Created by dengjing on 16/3/15.
 */

//var blog_content = '';

Template.blog_content.onRendered(() => {
    var link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'icon';
    link.href = '/favicon.ico';
    var elem = document.createElement('script');
    elem.type = 'text/javascript';
    elem.charset = 'utf-8';
    elem.src = 'http://tjs.sjs.sinajs.cn/open/api/js/wb.js';
    document.getElementsByTagName('head')[0].appendChild(link);
    document.getElementsByTagName('head')[0].appendChild(elem);
    $('html').attr("xmlns:wb","http://open.weibo.com/wb");
});


Template.blog_content.onCreated(() => {
    this.blogDictionary = new ReactiveDict();
    Template.instance().autorun(() => {
        let path = FlowRouter.getParam('year')+'/'+FlowRouter.getParam('month')+
                    '/'+FlowRouter.getParam('day')+'/'+FlowRouter.getParam('title');
        this.blogDictionary.isReady = Template.instance().subscribe('publish_article', () => {
            let cursor = publish_article.find({urlPath: path});
            let one = cursor.fetch()[0];
            if(one){
                //blog_content = one.text;
                this.blogDictionary.set('text', one.text);
                this.blogDictionary.set('id', one._id);
                this.blogDictionary.set('raw', one.raw);
                this.blogDictionary.set('en_title', one.en_title);
                this.blogDictionary.set('userId', one.userId);
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

Template.blog_content.events({
    'click .hollow': () => {
        const id = this.blogDictionary.get('id');
        FlowRouter.go(`/blog/update?id=${id}`);
    }
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
    },
    weibo: () => {
        let share = '<wb:share-button appkey="2953312031" addition="simple" type="button"' +
                    ' ralateUid="5211538803" default_text=":)"></wb:share-button>';
        return share;
    },
    isReady: () => {
        return this.blogDictionary.isReady.ready();
    },
    isUpdate: () => {
        let userId = this.blogDictionary.get('userId');
        let user = Meteor.user();
        let userName = '';
        if(user == null)
            return false;
        else{
            if (user.profile && user.profile.name)  //这一部分  记得重构
                userName = user.profile.name;
            else
                userName = user.emails[0].address;
        }
        return userName == 'shanyue2014' ? true : Meteor.userId() == userId;
    }
});
