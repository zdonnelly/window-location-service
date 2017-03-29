import Subject from '../../lib/subjects/windowLocationSubject';
import BaseSubject from '../../lib/subjects/baseSubject';
import ConsoleObserver from '../../lib/observers/consoleObserver';

describe('Subject.construct()', () => {
    it('should throw an error when called from a BaseSubject instantiation', () => {
        expect(() => {
            const bs = new BaseSubject();
        }).toThrowError();
    });
});
describe('Subject.addObserver()', () => {
	it('should throw an error if the observer argument does not implement the ObserverInterface', () => {
		const s = new Subject();
		const o = {};
		expect(() => {
            s.addObserver(o);
		}).toThrowError();
	});
    it('should increment the amount of observers by one when a new observer is attached', () => {
        const s = new Subject();
        const observerCountBeforeAdd = s.getObserverCount();
        const o = new ConsoleObserver();
        s.addObserver(o);
        expect(s.getObserverCount()).toBe(observerCountBeforeAdd + 1);
    });
});
describe('Subject.removeObserver()', () => {
    xit('should not throw an error if an the method is called and the list is empty', () => {
        const s = new Subject();
        expect(s.getObserverCount()).toBe(0);
        const o = new ConsoleObserver();
        expect(() => {
            s.removeObserver(o);
        }).not.toThrow();
    });
    it('should throw a TypeError if the Observer to remove is not an instance of the BaseObserver', () => {
        const s = new Subject();
        const o = {};
        expect(() => {
            s.removeObserver(o);
        }).toThrowError(TypeError);
    });
    it('should decrement the observer count after being called', () => {
        const s = new Subject();
        const o = new ConsoleObserver();
        s.addObserver(o);
        const preRemoveObserverCount = s.getObserverCount();
        s.removeObserver(o);
        expect(s.getObserverCount()).toBe(preRemoveObserverCount - 1);
    });
    it('should throw a reference error when trying to remove an observer that is not attached', () => {
        const s = new Subject();

        // Observer 1
        const o1 = new ConsoleObserver();
        s.addObserver(o1);

        // Observer 2
        const o2 = new ConsoleObserver();

        expect(() => {
            s.removeObserver(o2);
        }).toThrowError();
    });
});
describe('Subject.getObserverCount()', () => {
	it('should return 0 if the Subject list of observers is empty', () => {
		const s = new Subject();
		expect(s.getObserverCount()).toBe(0);
	});
    it('should store an observer count on construction', () => {
        const s = new Subject();
        expect('number' == typeof s.getObserverCount()).toBe(true);
    });
});
describe('Subject.broadcast()', () => {
    it('should call each attached observer\'s update method one time', () => {
        const s = new Subject();

        // Observer 1
        const o1 = new ConsoleObserver();
        s.addObserver(o1);
        spyOn(o1, 'update').and.callThrough();

        // Observer 2
        const o2 = new ConsoleObserver();
        s.addObserver(o2);
        spyOn(o2, 'update').and.callThrough();

        s.broadcast();
        expect(o1.update).toHaveBeenCalledTimes(1);
        expect(o2.update).toHaveBeenCalledTimes(1);

        s.broadcast();
        expect(o1.update).toHaveBeenCalledTimes(2);
        expect(o2.update).toHaveBeenCalledTimes(2);
    });
});
describe('Subject.getMessage()', () => {
    it('should be null upon construction', () => {
        const s = new Subject();
        expect(s.getMessage()).toBe(null)
    });
});