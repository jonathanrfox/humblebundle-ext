const backgroundToPopup = [
    'BACKGROUND_ACK',
    'FETCH_RESPONSE',
    'FETCH_ERROR',
    'STORAGE_CHANGE'
];

const popupToBackground = [
    'DOWNLOAD_REQUEST',
    'FETCH_REQUEST',
    'RELOAD_TAB'
];

export const Types = [
    ...backgroundToPopup,
    ...popupToBackground
].reduce((acc, type) => {
    acc[type] = type;
    return acc;
}, {});
