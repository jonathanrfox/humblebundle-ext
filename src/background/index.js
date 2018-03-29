import {
    onMessage,
    onBeforeWebRequest
} from '../browser';
import { handleMessage } from './message';
import { handleBeforeRequest } from './request';

if (process.env.NODE_ENV !== 'production') {
    console.log('background started.');
}

const filter = {
    urls: [
        '*://localhost/humbundlr/api*',
        '*://humblebundle.com/api*',
        '*://www.humblebundle.com/api*'
    ]
};
const extraInfoSpec = ['blocking'];

onBeforeWebRequest(handleBeforeRequest, filter, extraInfoSpec);
onMessage(handleMessage);
