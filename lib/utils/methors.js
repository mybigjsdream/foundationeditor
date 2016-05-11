/**
 * Created by dengjing on 16/4/21.
 */
Meteor.methods({
    validatePublishArticle: (article) => {
        check(article, {
            id: String,
            url_path: String,
            Categories: [String],
            title: String,
            raw: String,
            text: String,
            en_title: String,
            userName: String,
            userId: String
        });
        var status = {};
        let path_re = new RegExp('\\d+/\\d+/\\d+/\\w+');
        status.url_test = !!path_re.test(article.url_path); // 更多校验？
        status.is_login = article.userName != '匿名';
        return status;
    },
    esHandle: (q) => {
        check(q, String);
        const base_url = `http://182.92.220.227:8088/es/search`;
        try {
            var result = HTTP.get(base_url, {params: {q: q}});
        } catch (e) {
            return 'waiting.';
        }
        return result;
    }
});