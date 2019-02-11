import { reloadCurrentTab, sendMessage } from '../browser';
import { Types } from '../types';
import { handleDownload } from './download';
import { getStorageData } from './storage';


const typeToHandler = {
    [Types.DOWNLOAD_REQUEST]: [handleDownload, false],
    [Types.FETCH_REQUEST]: [getStorageData, true],
    [Types.RELOAD_TAB]: [reloadCurrentTab, false]
};

export const handleMessage = (message, sender, sendResponse) => {
    sendMessage({ type: Types.BACKGROUND_ACK });

    const { type, payload } = message;
    const [handlerFn, shouldKeepMessageChannelOpen] = typeToHandler[type];

    handlerFn({ payload, sendResponse });
    return shouldKeepMessageChannelOpen;
};
