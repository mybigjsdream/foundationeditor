/**
 * Created by dengjing on 16/2/1.
 */

Template.content.onCreated(
    () => {
        Session.setDefault('text', '');
        //console.log(template.find('[name=textarea]'));
    }
    //console.log($(e.target).find('[name=textarea]'))
);

Template.content.helpers({
    content: () => {
        return marked(Session.get('text')) + '<div id="msg_end"></div>';
    }
});

Template.content.events({
    'keyup .editor-content': (e) => {
        var $textarea = $(e.target).find('[name=textarea]');
        Session.set('text', $textarea.context.innerText);
    },
    //'keyup .editor-content': (e) => {
    //    var $textarea = $(e.target).find('[name=textarea]');
    //    Session.set('text', $textarea.context.innerText);
        //console.log($textarea);
        //new_content = "<span>" + $textarea.context.innerText + "</span>";
        //$textarea.context.innerHTML= new_content;
    //},
    'click .editor-content': (e) => {
        console.log(e.currentTarget);
        console.log(e);
    },
    //'scroll .editor-control': (e) => {
    //    console.log('haha');
    //}
});