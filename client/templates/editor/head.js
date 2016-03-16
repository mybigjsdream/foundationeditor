/**
 * Created by dengjing on 16/3/7.
 */
var interval;

Template.head.onCreated(() => {
    this.headDictionary = new ReactiveDict();
    Template.instance().autorun(() => {
        Template.instance().subscribe('cache_md', () => {
            let cursor = cache_md.find({}, {sort: {cTime: -1}});
            let cache_object = cursor.fetch()[0];
            if(cache_object){
                this.templateDictionary.set('text', cache_object['raw_html']);
                this.$('.editor-content').text(cache_object['raw_html']);
            }
        });
        Template.instance().subscribe('publish_article');
    });
});

Template.head.onRendered(
    () => {
        var mockClick = () => {
            this.$('.fi-minus')[0].click();
        };
        interval = setInterval(mockClick, 1000);
    }
);

Template.head.onDestroyed(
    () => {
        clearInterval(interval)
    }
);

Template.head.events({
    'click .fi-minus': (e) => {
        this.templateDictionary.set('text', this.$('.editor-content')[0].innerText);
        let text = '';
        try {
            text = cache_md.find({}, {sort: {cTime: -1}}).fetch()[0]['raw_html'];
        } catch (e) {
            console.log(e);
        }
        let react_text = this.templateDictionary.get('text');
        if(react_text != text && react_text.split('\n').join('') != ''){
            cache_md.insert({  //这个操作 估计得放放服务器端
                raw_html: react_text,
                cTime: new Date().getTime()
            });
        }
    },
    'click .fi-arrow-left': (e) => {
        let cursor = cache_md.find({}, {sort: {cTime: -1}});
        let cache_objects = cursor.fetch();
        if(cache_objects[1]){
            cache_md.remove({_id: cache_objects[0]._id});
            this.$('.editor-content').text(cache_objects[1]['raw_html']);
            this.templateDictionary.set('text', cache_objects[1]['raw_html']);
        }
    },
    'click .fi-monitor': (e) => {
        //let text = this.templateDictionary.get('text');
        //let head = '';
        //if(text.split('\n').join('') == ''){
        //    FlowRouter.go('/404');
        //}else{
        //    if(text.split('\n').length == 1){
        //        head = text;
        //    }else{
        //        head = text.split('\n')[0];
        //    }
        //}

        //let entitle = this.$('#entitle');
        //console.log(entitle);
        //return;
        let url_path = new Date().toLocaleDateString() + '/' + this.$('#entitle')[0].value; //之后做校验
        //let html = this.$('.base-content')[0].outerHTML;

        let base_content = this.$('.base-content')[0].children;
        //let text = this.$('.base-content:first:lt(1)');
        let title = base_content[0].outerHTML;
        //let text = base_content.splice(1).map((x)=>{return x.outerHTML}).join('');
        let text = Array.from(base_content, x => x.outerHTML).splice(1).join('');


        console.log(title);
        console.log(text);

        let id = CryptoJS.MD5(url_path).toString(); //之后可能要根据作者+标题吧 再加时间？
        let article = publish_article.findOne({_id: id});
        if(!article){
            publish_article.insert({
                _id: id,
                head: head,
                html: html,
                urlPath: url_path,
                cTime: new Date().getTime(),
                updateTime: new Date().getTime()
            });
            FlowRouter.go(`/blog/${id}`);
        }else{
            publish_article.update(
                {_id: id},
                {
                    $set: {
                        html: html,
                        updateTime: new Date().getTime()
                    }
                }
            );
            FlowRouter.go(`/blog/${id}`);
        }
    }
});