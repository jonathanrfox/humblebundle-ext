import { decode, sendMessage } from '../../browser';
import { Types } from '../../types';
import parser from '../parser';
import { ResponseHandler } from '../response';
import { InputStorage } from '../storage';


jest.mock('../parser');
jest.mock('../storage');
jest.mock('../../browser');

beforeEach(() => {
    jest.clearAllMocks();
    ResponseHandler.clear();
});

test('should construct ResponseHandler', () => {
    const responseHandler = new ResponseHandler('abc', {});
    expect(ResponseHandler._responseData).toEqual({});
});

test('ResponseHandler.onstart should initialize _responseData for id', () => {
    const responseHandler = new ResponseHandler('abc', {});
    responseHandler.onstart({});
    expect(ResponseHandler._responseData).toEqual({ abc: [] });
});

test('ResponseHandler.ondata should push data onto_responseData for id', () => {
    const data = { foo: 'bar' };
    const filter = {
        write: jest.fn()
    };
    decode.mockReturnValue(data);
    const responseHandler = new ResponseHandler('abc', filter);
    responseHandler._initResponseData();
    responseHandler.ondata({ data });
    expect(ResponseHandler._responseData['abc']).toEqual([ data ]);
    expect(filter.write).toHaveBeenCalled();
});

test('ResponseHandler.onstop should join data for id, parse it, and send it', () => {
    const filter = {
        disconnect: jest.fn()
    }
    const streamData = ['[1, 2', ', 3, 4]'];
    const joinedData = [1, 2, 3, 4];
    parser.parse.mockReturnValue(joinedData);
    const responseHandler = new ResponseHandler('abc', filter);
    responseHandler._initResponseData();
    ResponseHandler._responseData['abc'] = streamData;
    responseHandler.onstop();
    expect(parser.parse).toHaveBeenCalledWith(joinedData);
    expect(InputStorage.set).toHaveBeenCalledWith(joinedData);
    expect(sendMessage).toHaveBeenCalledWith({
        type: Types.STORAGE_CHANGE,
        payload: joinedData
    });
    expect(filter.disconnect).toHaveBeenCalled();
});
