import BaseSubject from './baseSubject';
/**
 * the private, unique href for this Object
 * @type {Symbol}
 * @private
 */
const _href = Symbol();
/**
 * array of transport method identifiers
 * @type {Symbol}
 * @private
 */
const _validTransportIdentifiers = Symbol();
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
        this[_validTransportIdentifiers] = ['http://', 'https://'];
        this[_href] = '';
    }

    /**
     * _href Setter
     * @param {string} href
     * @throws Error
     * @returns {void}
     */
    setHref(href) {
        if(!this.isValidHref(href)) {
            throw new Error('Invalid Transport type');
        }
        this[_href] = href;
        this.setMessage(this.getLastPart());
    }

    /**
     * href validator. if the argument contains '://' delimiter, then we need to make sure the value
     * before the delimiter is a valid transport method
     * @param {string} href
     * @returns {boolean}
     */
    isValidHref(href) {
        if(href.indexOf('://') > -1) {
            return this.hrefHasTransportMethod(href);
        }
        return true;
    }

    /**
     * _href Getter
     * @throws {ReferenceError}
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
        let hrefParts = null;
        let href = this.getHref();
        href = href.replace(/\/+$/, '');
        let hasTransport = this.hrefHasTransportMethod(href);
        if(false == hasTransport) {
            hrefParts = href.split('/');
            return hrefParts[hrefParts.length-1];
        }
        // Split the href into two parts: Before and after '://'. Then process the after part
        hrefParts = href.split('://');
        if(2 == hrefParts.length) {
            // remove a trailing backslash
            const location = hrefParts[1];
            const locationParts = location.split('/');
            if(locationParts.length < 2) {
                return href;
            }
            return locationParts[locationParts.length-1];
        }
    }

    /**
     * Check if the href has a transport method specified
     * @param {string} href
     * @returns {boolean}
     */
    hrefHasTransportMethod(href) {
        function checkTransport(array, val) {
            return array.some(function(arrayVal) {
                return arrayVal.toLowerCase() == val.substr(0, arrayVal.length).toLowerCase();
            });
        }
        return checkTransport(this[_validTransportIdentifiers], href);
    }
}
export default WindowLocationSubject;