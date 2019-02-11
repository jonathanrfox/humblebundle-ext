import {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
} from '../browser';
import { Types } from '../types';


class Storage {
    static get(key) {
        return getLocalStorage(key).then(obj => obj[key]);
    }
    static set(key, val) {
        return setLocalStorage(key, val);
    }
    static clear(key) {
        return removeLocalStorage(key);
    }
}

export class InputStorage extends Storage {
    static get() {
        return super.get(this.name);
    }
    static set(val) {
        return super.set(this.name, val);
    }
    static clear() {
        return super.clear(this.name);
    }
}

export async function getStorageData({ sendResponse }) {
    let payload, type;
    const inputData = await InputStorage.get();

    if (!inputData) {
        type = Types.FETCH_ERROR
        payload = { error: 'Data unavailable.'}
    } else {
        type = Types.FETCH_RESPONSE;
        payload = inputData
    }
    sendResponse({ type, payload });
}
