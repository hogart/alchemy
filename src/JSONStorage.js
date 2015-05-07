'use strict';

/**
 * Namespaced localStorage with automatic to/from JSON handling
 */
export default class JSONStorage {
    constructor (prefix) {
        if (prefix) {
            this.prefix = prefix + '.';
        } else {
            this.prefix = '';
        }
    }

    getItem (key) {
        const stored = localStorage.getItem(this.prefix + key);
        if (stored === undefined) {
            return undefined;
        } else {
            try {
                return JSON.parse(stored);
            } catch (e) {
                throw new Error(`Malformed JSON stored at ${key}: ${stored}`);
            }
        }
    }

    setItem (key, value) {
        try {
            let stringified = JSON.stringify(value);
            localStorage.setItem(this.prefix + key, stringified);
        } catch (e) {
            throw new Error(`Can't JSON.stringify ${key}: ${value}`);
        }
    }

    removeItem (key) {
        localStorage.removeItem(this.prefix + key);
    }

    clear () {
        if (!this.prefix) {
            localStorage.clear()
        } else {
            for (let i = 0; i < localStorage.length; i++) {
                let key = localStorage.key(i);
                if (key.startsWith(this.prefix + '.')) {
                    this.removeItem(key);
                }
            }
        }
    }
}