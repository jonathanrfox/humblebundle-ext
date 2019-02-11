import { filterResponses } from '../browser';
import { ResponseHandler } from './response';
import { InputStorage } from './storage';


const isValidRequest = ({ url, method, type }) => {
    return RegExp('.*/api/v[0-9]+/order.*', 'i').test(url.toLowerCase()) &&
        method.toLowerCase() === 'get' &&
        type.toLowerCase() === 'xmlhttprequest';
};

export const handleBeforeRequest = (details) => {
    if (!isValidRequest(details)) {
        return {};
    }
    const id = details.requestId;
    const filter = filterResponses(id);
    const responseHandler = new ResponseHandler(id, filter);
    filter.onstart = responseHandler.onstart.bind(responseHandler);
    filter.ondata = responseHandler.ondata.bind(responseHandler);
    filter.onstop = responseHandler.onstop.bind(responseHandler);
    filter.onerror = responseHandler.onerror.bind(responseHandler);
    return {};
};
