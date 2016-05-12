/**
 * Created by dengjing on 16/5/3.
 */

//var AWS = require('aws-sdk');
//var sqs = new AWS.SQS({region: 'us-west-2'});
var AWS = require('aws-sdk');

export default (op_type, id, en_title, text) => {
//var send_sqs = (op_type, id, en_title, text) => {
    try {
        var sqs = new AWS.SQS({region: 'us-west-2'});
    } catch (e) {  //为啥会有两次调用，反正先dirty处理下
        return
    }

    var params = {
        QueueUrl: 'https://us-west-2.queue.amazonaws.com/052792705405/river',  /* required */
    };
    var base_body = {};

    base_body.op_type = op_type;
    base_body.id = id;
    base_body.en_title = en_title || '';
    base_body.text = text || '';
    params.MessageBody = JSON.stringify(base_body);
    console.log('star send');
    sqs.sendMessage(params, function(err, data) {
        if (err)
            console.log(err, err.stack);
        else
            console.log(data);
    });
};

//export default {send_sqs};
