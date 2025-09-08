import { formatCurrency } from "../../scripts/utils/money.js";

console.log('Test suite: formatCurrency');

console.log('converts cents into dollars');

if (formatCurrency(2095) === '20.95') {
    console.log('passed')
} else {
    console.log('failed');
}


console.log('works with 0');

if (formatCurrency(0) === '0.00') {
    console.log('passed')
} else {
    console.log('failed');
}


console.log('rounds up correctly to the nearest cent');

if (formatCurrency(1000.5) === '10.01') {
    console.log('passed')
} else {
    console.log('failed');
}


console.log('rounds down correctly to the nearest cent');

if (formatCurrency(1000.4) === '10.00') {
    console.log('passed')
} else {
    console.log('failed');
}