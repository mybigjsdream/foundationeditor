/**
 * Created by dengjing on 16/4/5.
 */

Template.blog_page.onCreated(
    () => {
    }
);

Template.blog_page.events({
    'click .page-click': (e) => {
        let current_path = FlowRouter.current().path.split('?')[0];
        let a_text = $(e.target)[0].innerHTML;
        if(a_text == '首页')
            a_text = 1;
        if(a_text == '尾页')
            a_text = Math.ceil(publish_article.find().count()/page_size);
        if(a_text == '上一页')
            a_text = parseInt(FlowRouter.getQueryParam('page') || "1") - 1;
        if(a_text == '下一页')
            a_text = parseInt(FlowRouter.getQueryParam('page') || "1") + 1;
        a_text = parseInt(a_text);
        FlowRouter.go(`${current_path}?page=${a_text}`);
    }
});

Template.blog_page.helpers({
    page_count_small: () => {
        let articles_count = publish_article.find().count();
        let page = Math.ceil(articles_count/page_size);
        return page <= 10;
    },
    page_show_small: () => {
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
        for(let i = 0; i < total_page+4; i++){
            if (i == 0) {
                ret_pages.push({
                    'li_class': first_li_class,
                    'is_ellipsis': true,
                    'span_class': 'dis',
                    'is_a': first_li_a,
                    'value': '上一页'
                });
                continue;
            }
            if (i == 1) {
                ret_pages.push({
                    'li_class': first_li_class,
                    'is_ellipsis': true,
                    'span_class': 'dis',
                    'is_a': first_li_a,
                    'value': '首页'
                });
                continue;
            }
            if (i == total_page + 2) {
                ret_pages.push({
                    'li_class': last_li_class,
                    'is_ellipsis': true,
                    'span_class': 'dis',
                    'is_a': last_li_a,
                    'value': '尾页'
                });
                continue;
            }
            if (i == total_page + 3) {
                ret_pages.push({
                    'li_class': last_li_class,
                    'is_ellipsis': true,
                    'span_class': 'dis',
                    'is_a': last_li_a,
                    'value': '下一页'
                });
                continue;
            }
            if (i - 1 == current_page) {
                ret_pages.push({
                    'li_class': 'current',
                    'is_ellipsis': true,
                    'span_class': 'show-for-sr',
                    'is_a': false,
                    'value': current_page
                });
                continue;
            }
            ret_pages.push({
                'li_class': 'normal',
                'is_ellipsis': true,
                'span_class': 'dis',
                'is_a': true,
                'value': i - 1
            });
        }
        return ret_pages;
    },
    page_count_mildle_normal: () => {
        let articles_count = publish_article.find().count();
        let page = Math.ceil(articles_count/page_size);
        return page > 10;
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
            for(let i = 0; i < 11; i++) {
                if (i == 0) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '上一页'
                    });
                    continue;
                }
                if (i == 1) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '首页'
                    });
                    continue;
                }
                if (i - 1 == current_page) {
                    ret_pages.push({
                        'li_class': 'current',
                        'is_ellipsis': true,
                        'span_class': 'show-for-sr',
                        'is_a': false,
                        'value': current_page
                    });
                    continue;
                }
                if (i <= 4 && i >= 2) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': i - 1
                    });
                    continue;
                }
                if (i > 5 && i < 9) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': total_page - (8 - i)
                    });
                    continue;
                }
                if (i == 5) {
                    ret_pages.push({
                        'li_class': 'ellipsis',
                        'is_ellipsis': false,
                        //'span_class': 'dis',
                        //'is_a': false,
                        //'value': '首页'
                    });
                    continue;
                }
                if (i == 9) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '尾页'
                    });
                    continue;
                }
                if (i == 10) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '下一页'
                    });
                    continue;
                }
            }
            return ret_pages;
        }
        if(total_page - current_page <= 5) {
            for(let i = 0; i < 11; i++) {
                if (i == 0) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '上一页'
                    });
                    continue;
                }
                if (i == 1) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '首页'
                    });
                    continue;
                }
                if (i == 2) {
                    ret_pages.push({
                        'li_class': 'ellipsis',
                        'is_ellipsis': false,
                    });
                    continue;
                }
                if (i == 9) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '尾页'
                    });
                    continue;
                }
                if (i == 10) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '下一页'
                    });
                    continue;
                }
                if ((total_page - (8 - i)) == current_page) {
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
                        'value': total_page - (8 - i)
                    });
                    continue;
                }
            }
            return ret_pages;
        }
        if(current_page > 3 && total_page - current_page > 5) {
            for(let i = 0; i < 11; i++) {
                if (i == 0) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '上一页'
                    });
                    continue;
                }
                if (i == 1) {
                    ret_pages.push({
                        'li_class': first_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': first_li_a,
                        'value': '首页'
                    });
                    continue;
                }
                if (i == 2) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': current_page - 1
                    });
                    continue;
                }
                if (i == 3) {
                    ret_pages.push({
                        'li_class': 'current',
                        'is_ellipsis': true,
                        'span_class': 'show-for-sr',
                        'is_a': false,
                        'value': current_page
                    });
                    continue;
                }
                if (i == 4) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': current_page + 1
                    });
                    continue;
                }
                if (i > 5 && i < 9) {
                    ret_pages.push({
                        'li_class': 'normal',
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': true,
                        'value': total_page - (8 - i)
                    });
                    continue;
                }
                if (i == 5) {
                    ret_pages.push({
                        'li_class': 'ellipsis',
                        'is_ellipsis': false,
                    });
                    continue;
                }
                if (i == 9) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '尾页'
                    });
                    continue;
                }
                if (i == 10) {
                    ret_pages.push({
                        'li_class': last_li_class,
                        'is_ellipsis': true,
                        'span_class': 'dis',
                        'is_a': last_li_a,
                        'value': '下一页'
                    });
                    continue;
                }
            }
            return ret_pages;
        }
    },
});