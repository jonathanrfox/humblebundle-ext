import { Types } from '../../types';
import { getStorageData, InputStorage } from '../storage';


jest.mock('../../browser');

beforeEach(() => {
    jest.clearAllMocks();
});

test('getStorageData sends FETCH_ERROR', async () => {
    InputStorage.get = jest.fn();
    InputStorage.get.mockResolvedValue();
    const sendResponse = jest.fn();
    await getStorageData({ sendResponse });
    expect(InputStorage.get).toHaveBeenCalled();
    expect(sendResponse).toHaveBeenCalledWith({
        type: Types.FETCH_ERROR,
        payload: {error: 'Data unavailable.'}
    });
});

test('getStorageData sends FETCH_RESPONSE', async () => {
    InputStorage.get = jest.fn();
    InputStorage.get.mockResolvedValue(1);
    const sendResponse = jest.fn();
    await getStorageData({ sendResponse });
    expect(InputStorage.get).toHaveBeenCalled();
    expect(sendResponse).toHaveBeenCalledWith({
        type: Types.FETCH_RESPONSE,
        payload: 1
    });
});
