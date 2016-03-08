/**
 * Created by dengjing on 16/2/1.
 */

var baseFontSize = 58;

var getCurrentLine = (currentRange) => {
    var currentNode = currentRange.commonAncestorContainer;
    var currentOffset = currentRange.startOffset;
    var i = 1;
    var beforeValue = '';
    while(currentNode != null){
        var nvalue = currentNode.nodeValue;
        if(currentOffset != null) {
            nvalue = (nvalue || '').slice(0, currentOffset);
            currentOffset = null;
        }
        i = i + (nvalue || '').split('\n').length - 1;
        beforeValue += (nvalue || '').split('\n').join('');
        currentNode = currentNode.previousSibling;
    }
    if(beforeValue == ''){ //专门处理头几行全是回车的情况
        return 1;
    }
    return i;
};


var scrollPre = (e) => {
    var $textarea = $(e.target).find('[name=textarea]');
    this.templateDictionary.set('text', $textarea.context.innerText);
    var line = getCurrentLine(window.getSelection().getRangeAt(0));
    var count = 0;
    while(line == 1 && this.$('.base-content>#line-'+line).length == 0 ) { ////专门处理头几行全是回车的情况
        line += 1;
    }
    while(this.$('.base-content>#line-'+line).length == 0 && count < 10 && line > 1) {
        line -= 1;
        count += 1;
    }
    if(this.$('.base-content>#line-'+line).length > 0){
        var h = this.$('.base-content>#line-'+line)[0].offsetTop - baseFontSize;
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