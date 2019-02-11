import { sleep } from './utils';
// browser helper functions

export const sendMessage = (message) => {
    return browser.runtime.sendMessage(message);
};

export const onMessage = (callback) => {
    return browser.runtime.onMessage.addListener(callback);
};

export const removeMessageListener = (listener) => {
    if (browser.runtime.onMessage.hasListener(listener))
        browser.runtime.onMessage.removeListener(listener);
};

export const getLocalStorage = (key) => {
    return browser.storage.local.get(key);
};

export const setLocalStorage = (key, value) => {
    return browser.storage.local.set({
        [key]: value
    });
};

export const removeLocalStorage = (key) => {
    return browser.storage.local.remove(key);
};

export const filterResponses = (requestId) => {
    return browser.webRequest.filterResponseData(requestId);
};

export const onBeforeWebRequest = (callback, filter, extraInfo) => {
    return browser.webRequest.onBeforeRequest.addListener(callback, filter, extraInfo);
};

export const download = (url, filename) => {
    return browser.downloads.download({ url, filename, saveAs: false });
};

export const getDownloadState = async (id) => {
    const status = await browser.downloads.search({ id });
    try {
        return status[0].state;
    } catch (e) {
        return undefined;
    }
};

export const pollDownloadState = (id) => {
    return new Promise(async (resolve) => {
        while (true) {
            const state = await getDownloadState(id);
            if (state === "complete") {
                resolve(true);
                break;
            } else if (state === "interrupted") {
                resolve(false);
                break;
            } else {
                await sleep(1);
            }
        }
    });
};

export const reloadCurrentTab = () => {
    return browser.tabs.reload();
};

export const decode = (data) => {
    const decoder = new TextDecoder();
    return decoder.decode(data, {stream: true});
};
