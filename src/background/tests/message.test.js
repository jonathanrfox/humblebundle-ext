import { handleDownload } from '../download';
import { handleMessage } from '../message';
import { getStorageData, InputStorage } from '../storage';
import { reloadCurrentTab, sendMessage } from '../../browser';
import { Types } from '../../types';


jest.mock('../download');
jest.mock('../storage');
jest.mock('../../browser');

beforeEach(() => {
    jest.clearAllMocks();
});

test('handleMessage calls handleDownload', () => {
    let message = {
        type: Types.DOWNLOAD_REQUEST,
        payload: 1
    };
    let rv = handleMessage(message, 1, () => {});
    expect(sendMessage).toHaveBeenCalled();
    expect(handleDownload).toHaveBeenCalled();
    expect(rv).toBe(false);
});

test('handleMessage calls getStorageData', () => {
    let message = {
        type: Types.FETCH_REQUEST,
        payload: 1
    };
    let rv = handleMessage(message, 1, () => {});
    expect(sendMessage).toHaveBeenCalled();
    expect(getStorageData).toHaveBeenCalled();
    expect(rv).toBe(true);
});


test('handleMessage calls reloadCurrentTab', () => {
    let message = {
        type: Types.RELOAD_TAB,
        payload: 1
    };
    let rv = handleMessage(message, 1, () => {});
    expect(sendMessage).toHaveBeenCalled();
    expect(reloadCurrentTab).toHaveBeenCalled();
    expect(rv).toBe(false);
});
