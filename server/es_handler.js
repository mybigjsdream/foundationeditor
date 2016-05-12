/**
 * Created by dengjing on 16/4/29.
 */

//import elasticsearch from 'elasticsearch';

/*
var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: '182.92.220.227:8008',
    log: 'trace'
});

client.ping({
    requestTimeout: 30000,
    hello: "elasticsearch"
}, function (error) {
    if (error) {
        console.error('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

client.search({
    q: 'pants'
}).then(function (body) {
    var hits = body.hits.hits;
}, function (error) {
    console.trace(error.message);
});
*/
import send_sqs from '../lib/utils/handle_sqs';

var cursor = publish_article.find();
cursor.observeChanges({
    added: (id, fields) => {
        console.log('star...add');
        send_sqs('add', id, fields.en_title, fields.text);
    },
    changed: (id, fields) => {
        console.log('star...change');
        send_sqs('change', id, fields.en_title, fields.text);
    },
    removed: (id) => {
        console.log('star...remove');
        send_sqs('remove', id);
    }
});