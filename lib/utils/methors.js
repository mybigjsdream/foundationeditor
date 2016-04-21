/**
 * Created by dengjing on 16/4/21.
 */
Meteor.methods({
    isUpdate: (article) => {
        check(article, {
            id: String,
            url_path: String,
            Categories: [String],
            title: String,
            raw: String,
            text: String,
            userName: String,
            userId: String
        });
        var status = {};
        let path_re = new RegExp('\\d+/\\d+/\\d+/\\w+');
        if(path_re.test(article.url_path)){ //等待之后更多的校验
            status.url_test = true;
        }else{
            status.url_test = false;
        }
        if(article.userName == '匿名'){
            status.is_login = false;
        }else{
            status.is_login = true;
        }
        return status;
    }
});