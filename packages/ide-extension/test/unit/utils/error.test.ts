import { errorInstance } from '../../../src/utils/error';

describe('errorInstance', () => {
    it('should return an error object', () => {
        const e = new Error('test');
        const result = errorInstance(e);
        expect(result).toBeInstanceOf(Error);
    });

    it('should return an error object', () => {
        const e = 'test';
        const result = errorInstance(e);
        expect(result).toBeInstanceOf(Error);
    });
});
