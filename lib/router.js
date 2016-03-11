/**
 * Created by dengjing on 16/1/26.
 */
FlowRouter.route('/', {
    action: () => {
        console.log("Yeah! We are on the flowrouter.");
        BlazeLayout.render('layout');
    }
});
