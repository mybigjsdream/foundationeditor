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

Template.blog_page.events({
    'click .page-click': (e) => {
        let a_text = $(e.target)[0].innerHTML;
        if(a_text == '首页')
            a_text = 1;
        if(a_text == '尾页')
            a_text = Math.ceil(publish_article.find().count()/page_size);
        a_text = parseInt(a_text);
        console.log(a_text);
        FlowRouter.go(`/blog?page=${a_text}`);
    }
});

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
    page_count_mildle_normal: () => {
        let articles_count = publish_article.find().count();
        let page = Math.ceil(articles_count/page_size);
        return page > 7;
    },
    page_show_mildle_normal: () => {   //至少为十页
        let ret_pages = [];
        let first_li_class = 'normal';
        let first_li_a = true;
        let last_li_class = 'normal';
        let last_li_a = true;
        let current_page = parseInt(FlowRouter.getQueryParam('page') || "1");
        let total_page = Math.ceil(publish_article.find().count()/page_size);
        if(current_page == 1) {
            first_li_class = 'disabled';
            first_li_a = false;
        }
        if(current_page == total_page) {
            last_li_class = 'disabled';
            last_li_a = false;
        }
        if(current_page <= 3) {
            for(let i = 0; i < 9; i++) {
                if (i == 0) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '首页'
                    });
                    continue;
                }
                if (i == current_page) {
                    ret_pages.push({
                        'li_class': 'current',
                        'is_ellipsis': true,
                        'span_class': 'show-for-sr',
                        'is_a': false,
                        'value': current_page
                    });
                    continue;
                }
                if (i <= 3 && i != 0) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': i
                    });
                    continue;
                }
                if (i > 4 && i < 8) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': total_page - (7 - i)
                    });
                    continue;
                }
                if (i == 4) {
                    ret_pages.push({
                        'li_class': 'ellipsis',
                        'is_ellipsis': false,
                        //'span_class': 'dis',
                        //'is_a': false,
                        //'value': '首页'
                    });
                    continue;
                }
                if (i == 8) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '尾页'
                    });
                    continue;
                }
            }
            return ret_pages;
        }
        /*
        if(total_page - current_page <= 2) {
            for(let i = 0; i < 9; i++) {
                if (i == 0) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': false,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '首页'
                    });
                    continue;
                }
                if (i == current_page) {
                    ret_pages.push({
                        'li_class': 'current',
                        'is_ellipsis': false,
                        'span_class': 'show-for-sr',
                        'is_a': false,
                        'value': i-1
                    });
                    continue;
                }
                if (i <= 3 && i != 0) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': false,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': i
                    });
                    continue;
                }
                if (i > 4 && i < 8) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': false,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': i - 1
                    });
                    continue;
                }
                if (i == 4) {
                    ret_pages.push({
                        'li_class': 'ellipsis',
                        'is_ellipsis': true,
                    });
                    continue;
                }
                if (i == 8) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': false,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '尾页'
                    });
                    continue;
                }
            }
            return ret_pages;
        }*/
        if(total_page - current_page <= 5) {
            for(let i = 0; i < 9; i++) {
                if (i == 0) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '首页'
                    });
                    continue;
                }
                if (i == 1) {
                    ret_pages.push({
                        'li_class': 'ellipsis',
                        'is_ellipsis': false,
                    });
                    continue;
                }
                if (i == 8) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '尾页'
                    });
                    continue;
                }
                if ((total_page - (7 - i)) == current_page) {
                    ret_pages.push({
                        'li_class': 'current',
                        'is_ellipsis': true,
                        'span_class': 'show-for-sr',
                        'is_a': false,
                        'value': current_page
                    });
                    continue;
                } else {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': total_page - (7 - i)
                    });
                    continue;
                }
            }
            return ret_pages;
        }
        if(current_page > 3 && total_page - current_page > 5) {
            for(let i = 0; i < 9; i++) {
                if (i == 0) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '首页'
                    });
                    continue;
                }
                if (i == 1) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': current_page - 1
                    });
                    continue;
                }
                if (i == 2) {
                    ret_pages.push({
                        'li_class': 'current',
                        'is_ellipsis': true,
                        'span_class': 'show-for-sr',
                        'is_a': false,
                        'value': current_page
                    });
                    continue;
                }
                if (i == 3) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': current_page + 1
                    });
                    continue;
                }
                if (i > 4 && i < 8) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': total_page - (7 - i)
                    });
                    continue;
                }
                if (i == 4) {
                    ret_pages.push({
                        'li_class': 'ellipsis',
                        'is_ellipsis': false,
                    });
                    continue;
                }
                if (i == 8) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '尾页'
                    });
                    continue;
                }
            }
            return ret_pages;
        }
    },
});