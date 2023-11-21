
import { applyModifiers } from '../../src/utils/replaceText';

describe("applyModifiers for Text Replace", () => {
    it('should replace caps tags with capitals', () => {
        expect(applyModifiers('this is a <caps>Capital</caps> text line')).toBe('this is a CAPITAL text line');
    });
});
