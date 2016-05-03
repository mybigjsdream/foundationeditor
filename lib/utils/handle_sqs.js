/**
 * Created by dengjing on 16/5/3.
 */
import { EJSON } from 'meteor/ejson'

export default (en_title, text) => {
    var AWS = require('aws-sdk');
    var sqs = new AWS.SQS({region: 'us-west-2'});
    var params = {
        QueueUrl: 'https://us-west-2.queue.amazonaws.com/052792705405/river', /* required */
    };
    params.MessageBody = EJSON.parse(`{"en_title": ${en_title}, "text": ${text}`);
    console.log(en_title);
    sqs.sendMessage(params, function(err, data) {
        if (err)
            console.log(err, err.stack);
    });
}