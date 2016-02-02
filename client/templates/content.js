/**
 * Created by dengjing on 16/2/1.
 */

Template.content.onCreated(
    () => {
        Session.setDefault('text', '');
    }
);

Template.content.helpers({
    content: () => {
        return marked(Session.get('text')) + '<div id="msg_end"></div>';
    }
});

Template.content.events({
    'keyup .editor-content': (e, t) => {
        var $textarea = $(e.target).find('[name=textarea]');
        Session.set('text', $textarea.context.innerText);
    },
    'click .editor-content': (e, t) => {
        console.log(e.currentTarget);
        console.log(e);
    }
});