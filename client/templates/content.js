/**
 * Created by dengjing on 16/2/1.
 */

var baseFontSize = 58;

var getCurrentLine = (currentNode, e) =>{ //已知的bug：1.回车后删除的节点浏览器认为还存在，影响计算line 2.第一行是回车，判断不是节点
    let isEnter = false, i = 0;
    if(e.keyCode == 13){
        isEnter = true;
    }else{
        isEnter = false;
    }
    while(currentNode != null){
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

var scrollPre = (e) => {
    var $textarea = $(e.target).find('[name=textarea]');
    this.templateDictionary.set('text', $textarea.context.innerText);
    var line = getCurrentLine(window.getSelection().getRangeAt(0).startContainer, e);
    console.log(line);
    console.log(this.$('#line-'+line).length);
    if(this.$('#line-'+line).length > 0){
        var h = this.$('#line-'+line)[0].offsetTop - baseFontSize;
        this.$('.preview-container').animate({scrollTop: h}, 50);
    }
};

Template.content.onCreated(
    () => {
        this.templateDictionary = new ReactiveDict();
    }
);

Template.content.helpers({
    content: () => {
        marked.setOptions({
            highlight: (code) => {
                return hljs.highlightAuto(code).value;
            }
        });
        return marked(this.templateDictionary.get('text') || '');
    }
});

Template.content.events({ //58 根据字体确定
    'keyup .editor-content': (e) => {
        scrollPre(e);
    },
    'keydown .editor-content': (e) => {
        scrollPre(e);
    },
    'click .editor-content': (e) => {
        scrollPre(e);
    },
});