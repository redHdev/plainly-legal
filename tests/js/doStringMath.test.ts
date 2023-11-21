
import { doStringMath } from '../../src/utils/doStringMath';

describe("doStringMath function", () => {
    it('should evaluate simple mathematical expressions', () => {
        expect(doStringMath('24.3 + 2.5')).toBe('26.8');
        expect(doStringMath('26 - 1')).toBe('25');
    });

    it('should return the original string if it can\'t perform math on the expression', () => {
        expect(doStringMath('abcd')).toBe('abcd');
    });

    it('should return the original string if math operation is not valid', () => {
        expect(doStringMath('1/0')).toBe('1/0');
    });

    it('should handle expressions with negative numbers', () => {
        expect(doStringMath('-1 + 2')).toBe('1');
    });

    it('should handle complex expressions', () => {
        expect(doStringMath('(1 + 2) * 3')).toBe('9');
    });

    it('should handle floating point numbers without binary rounding issues', () => {
        expect(doStringMath('0.1 + 0.2')).toBe('0.3');
    });

    it('should handle very small floating point numbers', () => {
        expect(doStringMath('0.000315 + 0.00033')).toBe('0.000645');
    });

    it('should handle price based expressions', () => {
        expect(doStringMath('$26*$1,000')).toBe('$26,000');
    });

    it('should handle prices and always show two decimals if it has cents', () => {
        expect(doStringMath('$3*$1,000.2')).toBe('$3,000.60');
        expect(doStringMath('$3*$1,000.02')).toBe('$3,000.06');
    });

    it('should handle prices and not show decimals if it\'s round', () => {
        expect(doStringMath('$3.5*$1,000')).toBe('$3,500');
    });

    it('should handle prices and round if over 3 decimals', () => {
        expect(doStringMath('$2*$1,000.232')).toBe('$2,000.46');
    });
});
