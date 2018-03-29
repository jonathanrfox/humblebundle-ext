import {
    getLocalStorage,
    setLocalStorage,
    removeLocalStorage
} from '../browser';


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
