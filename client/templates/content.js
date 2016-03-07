/**
 * Created by dengjing on 16/2/1.
 */

var baseFontSize = 58;

var getCurrentLine = (currentRange) => {
    //已知的bug：如果是复制的内容会被当做一整块node，也有好处，解决方式，可以考虑格式化加上行数
    //也可以使用监控86 keycode解析
    var currentNode = currentRange.commonAncestorContainer;
    var currentOffset = currentRange.startOffset;
    console.log(currentOffset);
    var i = 1;
    if((currentNode != null) && (currentNode.nodeValue || '').split('\n').length == 2){ //第一次时候 计算当前位置的回车
        i = i + (currentNode.nodeValue || '').split('\n').length - 2;
        currentNode = currentNode.previousSibling;
    }
    while(currentNode != null){
        var nvalue = currentNode.nodeValue;
        nvalue = (nvalue || '').slice(0, currentOffset);
        i = i + (nvalue || '').split('\n').length - 1;
        currentNode = currentNode.previousSibling;
    }
    console.log(currentRange);
    return i;
};


var scrollPre = (e) => {
    var $textarea = $(e.target).find('[name=textarea]');
    this.templateDictionary.set('text', $textarea.context.innerText);
    var line = getCurrentLine(window.getSelection().getRangeAt(0));
    console.log(line);
    console.log(this.$('#line-'+line));
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
    'click .editor-content': (e) => {
        scrollPre(e);
    },
});