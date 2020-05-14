import { isDate, isPlainObject, extend, deepMerge } from '../../src/helpers/util';

describe('helpers:util', () => {
    describe('isXX', () => {
        test('should validate date', () => {
            expect(isDate(new Date())).toBeTruthy();
            expect(isDate(Date.now())).toBeFalsy();
        });

        test('should validate plainObject', () => {
            expect(isPlainObject({})).toBeTruthy();
            expect(isPlainObject(new Date())).toBeFalsy();
        });

        test('should be mutable', () => {
            const a = Object.create(null);
            const b = { foo: 123 };
            extend(a, b);
            expect(a.foo).toBe(123);
        });

        test('should extend properties', () => {
            const a = { foo: 1, bar: 2 };
            const b = { bar: 3, baz: 4 };
            const c = extend(a, b);
            expect(c.baz).toBe(4);
            expect(c.bar).toBe(3);
        });
    });
});
