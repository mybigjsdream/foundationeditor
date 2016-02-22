/**
 * Created by dengjing on 16/2/1.
 */

Template.content.onCreated(
    () => {
        this.templateDictionary = new ReactiveDict();
        this.templateDictionary.set('countID', 0);
        //this.$('[name=textarea]').html("<b>Hello world!</b>");
        //this.$('[name=textarea]').hide();
        //this.templateDictionary.set('text', '');
        //console.log('hahah' + this.$('[name=textarea]').val());
    }
);

Template.content.helpers({
    content: () => {
        return marked(this.templateDictionary.get('text') || '');
    }
});

Template.content.events({
    'keyup .editor-content': (e) => {
        var $textarea = $(e.target).find('[name=textarea]');
        this.templateDictionary.set('text', $textarea.context.innerText);
    },
    //'keyup .editor-content': (e) => {
    //    var $textarea = $(e.target).find('[name=textarea]');
    //    Session.set('text', $textarea.context.innerText);
        //console.log($textarea);
        //new_content = "<span>" + $textarea.context.innerText + "</span>";
        //$textarea.context.innerHTML= new_content;
    //},
    //'click .editor-content': (e) => {
    //    console.log(e.currentTarget);
    //    console.log(e);
    //},
    //'scroll .editor-control': (e) => {
    //    console.log('haha');
    //}
});