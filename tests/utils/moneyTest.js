import {formatCurrency} from '../../scripts/utils/money.js';
// Reads like english
// Creates a test suite
describe('test suite: formatCurrency', () => {
    // creates a test
    it('converts cents into dollars', () => {
        // code inside test
        // lets us comapre a value to another value - object returned
        expect(formatCurrency(2095)).toEqual('20.95');
    });

    it('works with 0', () => {
        expect(formatCurrency(0)).toEqual('0.00');
    });

    it('rounds up correctly to the nearest cent', () => {
        expect(formatCurrency(1000.5)).toEqual('10.01');
    })

    it('rounds down correctly to the nearest cent', () => {
        expect(formatCurrency(1000.4)).toEqual('10.00');
    })
});
 
