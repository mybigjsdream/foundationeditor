/**
 * Created by dengjing on 16/1/26.
 */

// 编辑器部分的 路由
FlowRouter.route('/', {
    action: () => {
        console.log("Yeah! We are on the flowrouter.");
        BlazeLayout.render('layout');
    }
});


//blog 部分的 路由
FlowRouter.route('/blog', {
    action: () => {
        BlazeLayout.render('blog_layout', {blog_content: 'blog_list' }); //不知道这样写是不是react时不好重构
    }
});

FlowRouter.route('/blog/:id', {
    action: () => {
        //console.log('welcome '+params.id);
        BlazeLayout.render('blog_layout', {blog_content: 'blog_content'});
    }
});

FlowRouter.notFound = {
    subscriptions: () => {},
    action: () => {
        console.log('you are missing!');
        BlazeLayout.render('notFound');
    }
};