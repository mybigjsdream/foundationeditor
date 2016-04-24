/**
 * Created by dengjing on 16/3/26.
 */
//import moment from 'moment';

var blog_id;

Template.blog_update.onCreated(
    () => {
        this.updateDictionary = new ReactiveDict();
        blog_id = FlowRouter.getQueryParam('id'); //考虑为none时的安全因素？
        Template.instance().autorun(() => {
            //这里是不是也存在个  已经存在订阅的问题呢？ 应该使用this.template而非meteor？
            this.updateDictionary.publish_ready = Meteor.subscribe('publish_article', blog_id);
        });
    }
);

Template.blog_update.onRendered(
    () => {
        Template.instance().autorun(() => {
            if(this.updateDictionary.publish_ready.ready()){
                const publish = publish_article.findOne({'_id': blog_id});
                if(Meteor.userId() != publish.userId || Meteor.userId() != 'PZGA95t8YH9FzJ9QK'){
                    alert('非法修改不属于自己的文章！');
                    FlowRouter.go('/blog');
                    return;
                }
                this.updateDictionary.set('en_title', publish.en_title);
                this.updateDictionary.set('raw', publish.raw);
                this.updateDictionary.set('url_path', publish.urlPath);
                this.$('.editor-content').text(publish.raw);
                this.$('#entitle').val(publish.en_title);
            }
        });
    }
);

Template.blog_update.helpers({
    ready: () => {
        return this.updateDictionary.publish_ready.ready();
    },
    content: () => {
        marked.setOptions({
            highlight: (code) => {
                return hljs.highlightAuto(code).value;
            }
        });
        return marked(this.updateDictionary.get('raw') || '');
    }
});

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
    this.updateDictionary.set('raw', this.$('.editor-content')[0].innerText);
    var line = getCurrentLine(window.getSelection().getRangeAt(0));
    var count = 0;
    while(line == 1 && this.$('.base-content>#line-'+line).length == 0 ) { //专门处理头几行全是回车的情况
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

Template.blog_update.events({ //58 根据字体确定
    'keyup .editor-content': (e) => {
        scrollPre(e);
        this.updateDictionary.set('back_count', 0);
    },
    'click .editor-content': (e) => {
        scrollPre(e);
        this.updateDictionary.set('back_count', 0);
    },
    'click #blog-home': (e) => {
        FlowRouter.go('/blog');
    },
    'click #fi-monitor': (e) => {
        var current_time = new Date();
        let en_title = this.$('#entitle')[0].value.toString();
        let Categories = this.$('#entitle')[0].value.toString().split('-').slice(1);
        let base_content = this.$('.base-content')[0].children;
        let title = base_content[0].outerHTML;
        let text = Array.from(base_content, x => x.outerHTML).splice(1).join('');
        let raw = this.updateDictionary.get('raw');
        let url_path = this.updateDictionary.get('url_path');
        if($.trim(raw) == ''){
            alert('正文不能为空');
            return
        }
        publish_article.update(  //做用户的校验
            {_id: blog_id},
            {
                $set: {
                    title: title,
                    text: text,
                    en_title: en_title,
                    raw: raw,
                    Categories: Categories,
                    updateTime: current_time.getTime()
                }
            }
        );
        FlowRouter.go(`/blog/${url_path}`);
    }
});