/**
 * Created by dengjing on 16/5/3.
 */
export default () => {
    var AWS = require('aws-sdk');
    var sqs = new AWS.SQS({region: 'us-west-2'});
    var params = {
        QueueUrl: 'https://us-west-2.queue.amazonaws.com/052792705405/river', /* required */
    };
    //sqs.receiveMessage(params, (err, data) => {
    //    if (err)
    //        console.log(err, err.stack); // an error occurred
    //    else
    //        console.log(data);           // successful response
    //});
    params.MessageBody = 'hello node_js';
    sqs.sendMessage(params, function(err, data) {
        if (err) console.log(err, err.stack);
        else     console.log(data);
    });
    //return {};
}