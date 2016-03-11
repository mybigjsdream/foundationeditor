/**
 * Created by dengjing on 16/1/26.
 */
FlowRouter.route('/', {
    action: () => {
        console.log("Yeah! We are on the flowrouter.");
        BlazeLayout.render('layout');
    }
});

FlowRouter.route('/blog/:id', {
    action: (params) => {
        console.log('welcome '+params.id);
    }
});

FlowRouter.notFound = {
    subscriptions: () => {},
    action: () => {
        console.log('you are missing!');
        BlazeLayout.render('notFound');
    }
};