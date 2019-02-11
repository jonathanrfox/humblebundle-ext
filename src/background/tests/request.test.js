import { filterResponses } from '../../browser';
import { handleBeforeRequest } from '../request';
import { ResponseHandler } from '../response';


jest.mock('../../browser');
jest.mock('../response');

beforeEach(() => {
    jest.clearAllMocks();
});

test('handleBeforeRequest sets event handlers', () => {
    const filter = {};
    filterResponses.mockReturnValue(filter);
    handleBeforeRequest({
        url: '/api/v1/order',
        method: 'get',
        type: 'xmlhttprequest'
    });
    expect(filterResponses.mock.calls.length).toBe(1);
    expect(filter.onstart).not.toBeUndefined();
    expect(filter.ondata).not.toBeUndefined();
    expect(filter.onstop).not.toBeUndefined();
    expect(filter.onerror).not.toBeUndefined();
});

test('handleBeforeRequest onstart initializes responseData object', () => {
    const filter = {};
    filterResponses.mockReturnValue(filter);
    handleBeforeRequest({
        requestId: 'id1',
        url: '/api/v1/order',
        method: 'get',
        type: 'xmlhttprequest'
    });
    filter.onstart({});
    expect(ResponseHandler).toHaveBeenCalledTimes(1);
    expect(ResponseHandler).toHaveBeenCalledWith('id1', expect.any(Object));
});


// test('handleBeforeRequest ondata pushes onto an array in the responseData object', () => {
//     let filter = {
//         write: jest.fn()
//     };
//     filterResponses.mockReturnValue(filter);
//     handleBeforeRequest({
//         requestId: 'id1',
//         url: '/api/v1/order',
//         method: 'get',
//         type: 'xmlhttprequest'
//     });
//     const data = '{"a": 1}';
//     filter.ondata({
//         data: data
//     });
//     decode.mockReturnValue(data)
//     expect(responseData['id1'].length).toBe(1);
//     expect(filter.write).toHaveBeenCalled();
// });


// test('handleBeforeRequest onstop calls appropriate functions', () => {
//     let filter = {
//         write: jest.fn(),
//         disconnect: jest.fn()
//     };
//     filterResponses.mockReturnValue(filter);
//     handleBeforeRequest({
//         requestId: 'id1',
//         url: '/api/v1/order',
//         method: 'get',
//         type: 'xmlhttprequest'
//     });
//     const data = '{"a": 1}';
//     filter.ondata({
//         data: data
//     })
//     decode.mockReturnValue(data)
//     filter.onstop({});
//     expect(InputStorage.set).toHaveBeenCalled();
//     expect(sendMessage).toHaveBeenCalled();
//     expect(filter.disconnect).toHaveBeenCalled();
// });
