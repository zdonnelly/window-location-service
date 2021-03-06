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
describe('WindowLocationSubject.setHref()', () => {
    it('should throw an error if the href transport method is not http or https', () => {
        const s = new WindowLocationSubject();
        expect(() => {
            s.setHref('ftp://foo.bar');
        }).toThrowError();
    });
});
describe('WindowLocationSubject.getLastPart()', () => {
    it('should parse the location from the href value as the substring after the last backslash', () => {
        const location = 'bar';
        const href = 'foo/'+location;
        const s = new WindowLocationSubject();
        s.setHref(href);
        expect(s.getLastPart()).toBe(location);
    });
    it('should parse the location as the last part of the href if multiple back-slashes are in the href', () => {
        const location = 'bar';
        const href = 'foo/baz/'+location;
        const s = new WindowLocationSubject();
        s.setHref(href);
        expect(s.getLastPart()).toBe(location);
    });
    it('should return the location as the string after the last backslash if two consecutive back-slashes are in the href', () => {
        const location = 'bar';
        const href = 'foo//'+location;
        const Subject = new WindowLocationSubject();
        Subject.setHref(href);
        expect(Subject.getLastPart()).toBe(location);
    });
    it('should return the full href value if the href does not contain a backslash', () => {
        const href = 'foo';
        const s = new WindowLocationSubject();
        s.setHref(href);
        expect(s.getHref()).toBe(href);
    });
    it('should return the full href value if the only backslashes contained in the href are immediately after the transport type (eg:http://)', () => {
        const href = 'http://localhost';
        const s = new WindowLocationSubject();
        s.setHref(href);
        expect(s.getLastPart()).toBe(href);
    });
    it('should ignore a backslash if it is the last character in the href (eg: no proceeding characters afterward', () => {
        const location = 'http://localhost';
        const href = location + '/';
        const s = new WindowLocationSubject();
        s.setHref(href);
        expect(s.getLastPart()).toBe(location);
    });
    it('can operate on href with many back-slashes', () => {
        const lastPart = 'foobarbaz';
        const href = 'http://foo/bar/baz/foobar/foobaz/' + lastPart;
        const s = new WindowLocationSubject();
        s.setHref(href);
        expect(s.getLastPart()).toBe(lastPart);
    });
});
describe('WindowLocationSubject.getMessage()', () => {
    it('should get back the same message that was set in setHref() if setMessage() was not called', () => {
        const s = new WindowLocationSubject();
        const href = 'foo';
        s.setHref(href);
        expect(s.getMessage()).toBe(href);
    });
});
describe('WindowLocationSubject.hrefHasTransportMethod()', () => {
    it('should return false if the href contains no colon', () => {
        const s = new WindowLocationSubject();
        expect(s.hrefHasTransportMethod('foo')).toBe(false);
    });
    it('should return false if no string given before color', () => {
        const s = new WindowLocationSubject();
        expect(s.hrefHasTransportMethod('://')).toBe(false);
    });
    it('should return true if http:// given as href argument', () => {
        const s = new WindowLocationSubject();
        expect(s.hrefHasTransportMethod('http://')).toBe(true);
    });
    it('should return false if anything other than http or https protocols given', () => {
        const s = new WindowLocationSubject();
        expect(s.hrefHasTransportMethod('ftp://')).toBe(false);
        expect(s.hrefHasTransportMethod('ssh://')).toBe(false);
    });
    it('should not be case sensitive', () => {
        const s = new WindowLocationSubject();
        expect(s.hrefHasTransportMethod('HTTP://')).toBe(true);
    })
});