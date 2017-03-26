import WindowLocationSubject from '../../lib/subjects/windowLocationSubject';

describe('WindowLocationSubject.getHref()', () => {
    it('should get back the set href value', () => {
        const href = 'foo';
        const s = new WindowLocationSubject();
        s.setHref(href);
        expect(s.getHref()).toBe(href);
    });
    it('should return the window.location.href property if the internal property is an empty string', () => {
        const s = new WindowLocationSubject();
        if('undefined' == typeof window) {
            const window = { location: { href: 'foo' } };
        }
        expect(s.getHref()).toBe(window.location.href);
    });
});
describe('WindowLocationSubject.getLastPart()', () => {
    it('should parse the location from the href value as the substring after the last backslash', () => {
        const location = 'bar';
        const href = 'foo/'+location;
        const Subject = new WindowLocationSubject();
        Subject.setHref(href);
        expect(Subject.getLastPart()).toBe(location);
    });
    it('should parse the location as the last part of the href if multiple back-slashes are in the href', () => {
        const location = 'bar';
        const href = 'foo/baz/'+location;
        const Subject = new WindowLocationSubject();
        Subject.setHref(href);
        expect(Subject.getLastPart()).toBe(location);
    });
    it('should return the location as the string after the last backslash if two consecutive back-slashes are in the href', () => {
        const location = 'bar';
        const href = 'foo//'+location;
        const Subject = new WindowLocationSubject();
        Subject.setHref(href);
        expect(Subject.getLastPart()).toBe(location);
    });
});
describe('WindowLocationSubject.setMessage()', () => {
    it('should get back the same message that was set in setHref()', () => {
        const s = new WindowLocationSubject();
        const href = 'foo';
        s.setHref(href);
        expect(s.getMessage()).toBe(href);
    });
});