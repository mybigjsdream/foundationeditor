/**
 * Created by dengjing on 16/4/8.
 */

Template.blog_sticky_list.helpers({
    categories: () => {
        let ones = publish_article.find({}).fetch();
        let ret_authors = {};
        let ret_name = {};
        ones.forEach((one) => {
            one.Categories.forEach((o) => {
                if(ret_authors[o]) {
                    ret_authors[o] += 1;
                } else {
                    ret_authors[o] = 1;
                }
            });
        });
        for(let key of Object.keys(ret_authors)){
            ret_name[ret_authors[key]] = key
        }
        console.log(ret_name);
        let last_return = [];
        for(let key of Object.keys(ret_name).sort().reverse()){
            last_return.push({'name': ret_name[key]});
        }
        return last_return.splice(0, 4);
    },
    authors: () => {
        let ones = publish_article.find({}).fetch();
        let ret_authors = {};
        let ret_name = {};
        ones.forEach((one) => {
            if(ret_authors[one.userName]) {
                ret_authors[one.userName] += 1;
            } else {
                ret_authors[one.userName] = 1;
            }
        });
        for(let key of Object.keys(ret_authors)){
            ret_name[ret_authors[key]] = key
        }
        let last_return = [];
        for(let key of Object.keys(ret_name).sort().reverse()){
            last_return.push({'name': ret_name[key]});
        }
        return last_return.splice(0, 4);
    },
});
