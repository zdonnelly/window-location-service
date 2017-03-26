import BaseSubject from '../subjects/baseSubject';

class BaseObserver {
    constructor() {}

    /**
     * Attaches self to a Subject
     * @param {BaseSubject} BaseSubject
     * @public
     */
    observe(BaseSubject) {
        BaseSubject.addObserver(this);
    }

    /**
     * Un-attaches from the Subject
     * @param {BaseSubject} BaseSubject
     */
    forget(BaseSubject) {
        BaseSubject.removeObserver(this);
    }

    /**
     * Execute concrete update method
     * @param {string} arg
     * @public
     */
    update(arg) {
        this.doUpdate(arg);
    }

    /**
     * The observers update method when an event is broadcast.
     * @param {string} arg
     * @private
     */
    doUpdate(arg) {}
}

export default BaseObserver;