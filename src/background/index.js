import {
    onMessage,
    onBeforeWebRequest
} from '../browser';
import { handleMessage } from './message';
import { handleBeforeRequest } from './request';

let urls;
if (process.env.NODE_ENV === 'production') {
    console.log('background started.');
    urls = [
        '*://humblebundle.com/api*',
        '*://www.humblebundle.com/api*'
    ];
} else {
    urls = ['*://localhost/api*']
}

const filter = {urls};
const extraInfoSpec = ['blocking'];

onBeforeWebRequest(handleBeforeRequest, filter, extraInfoSpec);
onMessage(handleMessage);
