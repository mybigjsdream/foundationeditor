/**
 * Created by dengjing on 16/2/1.
 */

var getCurrentLine = (currentNode, isEnter) =>{
    let i = 0;
    while(currentNode != null){
        console.log(currentNode);
        if(currentNode.data == '\n'){
            i++;
        }
        currentNode = currentNode.previousSibling;
    }
    if(isEnter)
        return i;
    else
        return i + 1;
};

Template.content.onCreated(
    () => {
        this.templateDictionary = new ReactiveDict();
        //this.templateDictionary.set('countID', 0);
    }
);

Template.content.helpers({
    content: () => {
        return marked(this.templateDictionary.get('text') || '');
    }
});

Template.content.events({
    'keyup .editor-content': (e) => {
        if(e.keyCode == 13){
            var $textarea = $(e.target).find('[name=textarea]');
            this.templateDictionary.set('text', $textarea.context.innerText);
            console.log(getCurrentLine(window.getSelection().getRangeAt(0).startContainer, true));
        } else{
            var $textarea = $(e.target).find('[name=textarea]');
            this.templateDictionary.set('text', $textarea.context.innerText);
            console.log(getCurrentLine(window.getSelection().getRangeAt(0).startContainer, false));
        }
    },


    /*
    'focus .editor-content': (e) => {
        console.log(e);
    },

    'blur .editor-content': (e, t) => {
        //console.log(e.window.getSelection().getRangeAt(0));
        //window.getSelection().getRangeAt(0).setStart($(e.target).find('#star'), 0);
        //console.log(window.getSelection().focusNode.parentNode);
        console.log(window.getSelection().getRangeAt(0));
        console.log(window.getSelection().getRangeAt(0).startContainer.previousSibling.previousSibling);
    }
    */
});