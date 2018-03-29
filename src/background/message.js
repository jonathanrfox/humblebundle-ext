import { reloadCurrentTab, sendMessage } from '../browser';
import { Types } from '../common';
import { handleDownload } from './download';
import { InputStorage } from './storage';


const typeToHandler = {
    [Types.DOWNLOAD_REQUEST]: [handleDownload, false],
    [Types.FETCH_REQUEST]: [handleFetch, true],
    [Types.RELOAD_TAB]: [handleReloadTab, false]
};

function handleReloadTab() {
    reloadCurrentTab();
}

async function handleFetch({ sendResponse }) {
    let payload, type;
    const inputData = await InputStorage.get();

    if (!inputData) {
        type = Types.FETCH_ERROR
        payload = { error: 'Data unavailable.'}
    } else {
        type = Types.FETCH_RESPONSE;
        payload = inputData
    }
    sendResponse({ type, payload });
}

export function handleMessage(message, sender, sendResponse) {
    sendMessage({ type: Types.BACKGROUND_ACK });

    const { type, payload } = message;
    const [handlerFn, shouldKeepMessageChannelOpen] = typeToHandler[type];

    handlerFn({ payload, sendResponse });
    return shouldKeepMessageChannelOpen;
}
