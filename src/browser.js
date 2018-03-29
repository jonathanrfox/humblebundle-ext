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

export const onBeforeWebRequest = (callback, ...args) => {
    return browser.webRequest.onBeforeRequest.addListener(callback, ...args);
};

export const download = (options) => {
    return browser.downloads.download({
        ...options,
        saveAs: false
    });
};

export const getDownloadStatus = async (id) => {
    const status = await browser.downloads.search({ id });
    if (!status instanceof Array) {
        return undefined;
    }
    return status[0].state;
};

export const cancelDownload = (id) => {
    return browser.downloads.cancel(id);
};

export const reloadCurrentTab = () => {
    return browser.tabs.reload();
}
