/**
 * Created by dengjing on 16/1/26.
 */

// 编辑器部分的 路由
FlowRouter.route('/', {
    action: () => {
        BlazeLayout.render('blog_layout', {blog_content: 'blog_list' }); //不知道这样写是不是react时不好重构
    }
});

FlowRouter.route('/editor', {
    action: () => {
        BlazeLayout.render('layout');
    }
});

//blog 部分的 路由
FlowRouter.route('/about', {
    action: () => {
        BlazeLayout.render('blog_about', {blog_content: 'blog_about'});
    }
});
FlowRouter.route('/blog', {
    action: () => {
        BlazeLayout.render('blog_layout', {blog_content: 'blog_list' }); //不知道这样写是不是react时不好重构
    }
});
FlowRouter.route('/blog/update', {
    action: () => {
        BlazeLayout.render('blog_update');
    }
});
FlowRouter.route('/category/:category', {
    action: () => {
        BlazeLayout.render('blog_layout', {blog_content: 'blog_list' });
    }
});
FlowRouter.route('/author/:author', {
    action: () => {
        BlazeLayout.render('blog_layout', {blog_content: 'blog_list' });
    }
});

FlowRouter.route('/blog/:year/:month/:day/:title', {
    action: () => {
        //console.log('welcome '+params.id);
        BlazeLayout.render('blog_layout', {blog_content: 'blog_content'});
    }
});

FlowRouter.notFound = {
    action: () => {
        console.log('you are missing!');
        BlazeLayout.render('notFound');
    }
};