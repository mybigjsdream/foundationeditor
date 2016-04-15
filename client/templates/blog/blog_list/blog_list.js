/**
 * Created by dengjing on 16/3/26.
 */
//import moment from 'moment';
moment.locale('zh-cn');

page_size = 3;

Template.blog_list.onRendered(
    () => {
        //$(document).foundation();
        Template.instance().autorun(() => {
            let category = FlowRouter.getParam('category');
            let author = FlowRouter.getParam('author');
            Template.instance().subscribe('publish_article', null, category, author);
        });
    }
);

Template.blog_list.helpers({
    posts: () => {
        var ret_obj = [];
        var get_first_img = (o) => {
            let tmp = [];
            $.parseHTML(o.text).forEach((o) => {
                let img = o.getElementsByTagName('img');
                if (img.length != 0 && img[0]['src'] != undefined) {
                    tmp.push(img[0]['src']);
                }
            });
            return tmp[0];
        };
        var get_first_text = (o) => {
            let tmp = [];
            let txt = '';
            $.parseHTML(o.text).forEach((o) => {
                txt += o.innerText;
                if(txt.length < 200){
                    tmp.push(o.innerHTML);
                }
            });
            return tmp.join('');
        };
        let base_skip = parseInt(FlowRouter.getQueryParam('page') || "1");
        let page_skip = page_size * (base_skip - 1);
        publish_article.find({}, {sort: {updateTime: -1}, limit: page_size, skip: page_skip}).forEach((o) => {
            let firstImg, text;
            if(!$.parseHTML(o.text)){
                firstImg = '默认图片';
                text = '正文没有内容';
            }else{
                firstImg = null;
                text = null;
            }
            ret_obj.push({
                'title': $.parseHTML(o.title)[0].innerHTML,  //以后考虑用 html => mkdown 包
                'updateTime':  moment(new Date(parseInt(o.updateTime))).fromNow(),
                'firstImg': firstImg || get_first_img(o),
                'id': o._id,
                'path': o.urlPath,
                'text': text || get_first_text(o),
                'userId': o.userId,
                'userName': o.userName
            });
        });
        return ret_obj;
    },
});