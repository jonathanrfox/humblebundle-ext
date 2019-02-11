import { decode, sendMessage } from '../browser';
import { Types } from '../types';
import parser from './parser';
import { InputStorage } from './storage';


export class ResponseHandler {
    static _responseData = {};

    constructor(id, filter) {
        this.id = id;
        this.filter = filter;
    }

    _initResponseData() {
        ResponseHandler._responseData[this.id] = [];
    }

    _getResponseData() {
        return ResponseHandler._responseData[this.id] || [];
    }

    _appendResponseData(data) {
        ResponseHandler._responseData[this.id].push(data);
    }

    static clear() {
        ResponseHandler._responseData = {};
    }

    onstart(event) {
        this._initResponseData();
    }

    ondata(event) {
        this._appendResponseData(decode(event.data));
        this.filter.write(event.data);
    }

    onstop(event) {
        try {
            const joined = this._getResponseData().join('');
            const data = JSON.parse(joined);
            const parsed = parser.parse(data);
            // put it in local storage so we can get it later when popup is ready
            InputStorage.set(parsed);
            // try to notify popup
            sendMessage({
                type: Types.STORAGE_CHANGE,
                payload: parsed
            });
        } catch (e) {
            console.error(e);
        } finally {
            this.filter.disconnect();
        }
    }

    onerror(error) {
        console.error(error);
    }
}
