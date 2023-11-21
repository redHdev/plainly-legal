'use client';
import * as math from 'mathjs';

/**
 * Takes a string like this "$$26*$1,000" or "24.3 + 2.5" or "26 - 1" and returns the result of the math in string form with a string number or string price if it was a price
 * This has a max of 14 decimal places of precision
 * @param {string} text
 */
export function doStringMath(text: string): string {
    // Remove $ symbols and replace comma to make a valid math expression
    const expression = text.replace(/\$/g, '').replace(/,/g, '');

    try {
        let result = math.evaluate(expression) as number;

        //throw error so the try catch block below will catch it
        if (!isFinite(result)) throw new Error( 'Not a valid math expression or Infinity or NaN was returned for input: ' + expression );

        const hasDollarSign = text.includes('$');

        if (hasDollarSign) {
            // Format the number to include commas and prefix with $$
            // If the result has more than 3 decimal places, round it to two decimals
            if (result % 1 !== 0) {
                result = Math.round((result + Number.EPSILON) * 100) / 100;
                return '$' + result.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
            } else {
                return '$' + result.toLocaleString('en-US');
            }
        } else {
            // If the result has more than 15 decimal places, round it to 14 decimals
            if ((result.toString().split('.')[1] || '').length > 14) {
                result = parseFloat(result.toFixed(14));
            }
            // Just return the number as a string
            return result.toString();
        }
    } catch (error) {
        // If there is an error, return the original text
        return text;
    }
}

export default doStringMath;
