import BaseObserver from '../observers/baseObserver';

const _observers = Symbol();
const _message = Symbol();

/**
 * Initializes an empty array to hold a list of Observer objects. Observers can be added to the list using
 * the addObserver method
 * @class BaseSubject
 */
class BaseSubject{
    /**
	 * Initializes an empty list of observers.
	 * @constructor
     */
	constructor(){
        if(new.target === BaseSubject) {
        	throw new TypeError('Cannot instantiate BaseSubject class directly');
		}
		this[_observers] = [];
		this[_message] = null;
	}

    /**
	 * Get the number of Observers observing this Subject
     * @returns {Number} The count of Observers
     */
	getObserverCount() {
		return this[_observers].length;
	}
    /**
	 * Add an Observer to the list
     * @param {BaseObserver} Observer an instance of BaseObserver
	 * @throws {Error} if the Observer is not an instance of BaseObserver
     */
	addObserver(Observer) {
		if(!(Observer instanceof BaseObserver)) {
            throw new Error('Observer argument must must be an instance of BaseObserver');
		}
		this[_observers].push(Observer);
	}

    /**
	 * Removes an Observer the this Objects list of Observers
     * @param {BaseObserver} Observer
	 * @throws TypeError - If the Observer is not an instance of BaseObserver
	 * @throws ReferenceError - If the Observer is not attached to this Object
     */
	removeObserver(Observer) {
		if(!(Observer instanceof BaseObserver)) {
            throw new TypeError('The Observer must be an instance of BaseObserver');
		}
        let observerIndex = this[_observers].indexOf(Observer);
		if(observerIndex > -1) {
			this[_observers].splice(observerIndex, 1);
		} else {
			throw new ReferenceError('The Observer is not attached to this Subject');
		}
	}

    /**
	 * Calls each attached observers' update method, passing in the message argument.
     */
	broadcast() {
		const message = this.getMessage();
		this[_observers].forEach((observer) => {
			observer.update(message);
		});
	}

    /**
	 * _message Getter
     * @returns {*}
     */
	getMessage() {
		return this[_message];
	}

    /**
	 * message Setter. This method should only be called from extended classes.
	 * @throws TypeError always
     */
	setMessage(message) {
		this[_message] = message;
	}
}
export default BaseSubject;