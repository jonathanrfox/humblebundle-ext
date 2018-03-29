import {
    filterResponses,
    onBeforeWebRequest,
    sendMessage,
} from '../browser';
import { Types } from '../common';
import parser from './parser';
import { InputStorage } from './storage';


export function handleBeforeRequest(details) {
    const decoder = new TextDecoder();
    const decode = msg => decoder.decode(msg, {stream: true});

    let responseData;
    let filter = filterResponses(details.requestId);

    filter.onstart = (event) => {
        console.log('onstart fired');
        responseData = [];
    };

    filter.ondata = (event) => {
        console.log('ondata fired');
        responseData.push(decode(event.data));
        filter.write(event.data);
    };

    filter.onstop = (event) => {
        console.log('onstop fired');
        try {
            let joined = responseData.join('');
            console.log(joined);

            let data = JSON.parse(joined);
            console.log(data);

            let parsed = parser.parse(data);

            InputStorage.set(parsed);

            sendMessage({
                type: Types.STORAGE_CHANGE,
                payload: parsed
            });
        } catch (e) {
            console.error(e);
        } finally {
            filter.disconnect();
        }
    };

    filter.onerror = (err) => {
        console.log('onerror fired');
        console.error(err);
    };

    return {};
}
