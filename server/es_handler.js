/**
 * Created by dengjing on 16/4/29.
 */
import send_sqs from '../lib/utils/handle_sqs';

var cursor = publish_article.find();
cursor.observeChanges({
    added: (id, fields) => {
        console.log('star...add');
        //send_sqs('add', id, fields.en_title, fields.text);
    },
    changed: (id, fields) => {
        console.log('star...change');
        //send_sqs('change', id, fields.en_title, fields.text);
    },
    removed: (id) => {
        console.log('star...remove');
        //send_sqs('remove', id);
    }
});