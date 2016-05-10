/**
 * Created by dengjing on 16/5/3.
 */

export default (op_type, id, en_title, text) => {
    var AWS = require('aws-sdk');
    var sqs = new AWS.SQS({region: 'us-west-2'});
    var params = {
        QueueUrl: 'https://us-west-2.queue.amazonaws.com/052792705405/river',  /* required */
    };
    var base_body = {};

    base_body.op_type = op_type;
    base_body.id = id;
    base_body.en_title = en_title || '';
    base_body.text = text;
    params.MessageBody = JSON.stringify(base_body);
    sqs.sendMessage(params, function(err, data) {
        if (err)
            console.log(err, err.stack);
        else
            console.log(data);
    });
}