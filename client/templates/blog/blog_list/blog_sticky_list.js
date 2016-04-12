/**
 * Created by dengjing on 16/4/8.
 */
Template.blog_sticky_list.onRendered(
    () => {
        //$(document).foundation($('.sticky'), 'reflow');
        //this.sticky = new Foundation.Sticky($('.sticky'));
        //setTimesetTimeout(() => {$('.sticky').foundation();},1000);
        Template.instance().autorun(() => {
            Template.instance().subscribe('article_author_view');
            Template.instance().subscribe('article_category_view');
        });
    }
);

Template.blog_sticky_list.helpers({
    categories: () => {
        let ones = article_category_view.find({}).fetch();
        let ret_authors = {};
        let ret_name = [];
        ones.forEach((one) => {
            if(ret_authors[one.category]) {
                ret_authors[one.category] += 1;
            } else {
                ret_authors[one.category] = 1;
            }
        });
        for(let key of Object.keys(ret_authors)){
            ret_name.push({name: key, value: ret_authors[key]});
        }
        ret_name.sort((a, b) => {return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0);});
        return ret_name.splice(0, 4);
    },
    authors: () => {
        let ones = article_author_view.find({}).fetch();
        let ret_authors = {};
        let ret_name = [];
        ones.forEach((one) => {
            if(ret_authors[one.userName]) {
                ret_authors[one.userName] += 1;
            } else {
                ret_authors[one.userName] = 1;
            }
        });
        for(let key of Object.keys(ret_authors)){
            ret_name.push({name: key, value: ret_authors[key]});
        }
        ret_name.sort((a, b) => {return (a.value < b.value) ? 1 : ((b.value < a.value) ? -1 : 0);});
        return ret_name.splice(0, 4);
    },
});
