/**
 * Created by dengjing on 16/3/26.
 */

page_size = 3;

Template.blog_list.onRendered(
    () => {
        //console.log(FlowRouter.getParam('page'));
        Template.instance().autorun(() => {
            Template.instance().subscribe('publish_article');
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
        //console.log(page_skip);
        publish_article.find({}, {sort: {updateTime: -1}, limit: page_size, skip: page_skip}).forEach((o) => {
            ret_obj.push({
                'title': $.parseHTML(o.title)[0].innerHTML,  //以后考虑用 html => mkdown 包
                'updateTime':  new Date(parseInt(o.updateTime)).toLocaleString(),  //.split(' ')[0]
                'firstImg': get_first_img(o),
                'id': o._id,
                'path': o.urlPath,
                'text': get_first_text(o),
                'userId': o.userId,
                'userName': o.userName
            });
        });
        return ret_obj;
    },
});