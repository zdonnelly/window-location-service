import BaseSubject from './baseSubject';

/**
 * the private, unique href for this Object
 * @type {Symbol}
 * @private
 */
const _href = Symbol();

const _message = Symbol();

/**
 * Subject that broadcasts the current window.location.href value
 * @class WindowLocationSubject
 * @extends BaseSubject
 */
class WindowLocationSubject extends BaseSubject{
    /**
     * Calls BaseSubject constructor
     * @constructor
     */
    constructor() {
        super();
        this[_href] = '';
    }

    /**
     * _href Setter
     * @param {string} href
     */
    setHref(href) {
        this[_href] = href;
        this.setMessage(this.getLastPart());
    }

    /**
     * _href Getter
     * @returns {string} - the href of the current location unless it has been set otherwise.
     */
    getHref() {
        if(this[_href] !== '') {
            return this[_href];
        }
        if('undefined' !== typeof window && 'undefined' !== typeof window.location) {
            return window.location.href;
        }
        throw new ReferenceError('Couldn\'t find a suitable href value to return');
    }

    /**
     * Get the value of the part from the href after the final back-slash, if one is present. If no backslash exists
     * in the href property, then returns the href;
     * @returns {string} The final part of the href after any back-slashes
     */
    getLastPart() {
        const parts = this[_href].split('/');
        return parts[parts.length-1];
    }
}

export default WindowLocationSubject;