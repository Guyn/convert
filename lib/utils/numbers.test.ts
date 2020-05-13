export {};
const Utilities = require('./');

test('Bound', () => {
	expect(Utilities.bound(100, 50)).toBe(1);
	expect(Utilities.bound(25, 50)).toBe(0.5);
	expect(Utilities.bound(-100, 50)).toBe(0);
});

test('isPercentage', () => {
	expect(Utilities.isPercentage('100')).toBe(false);
	expect(Utilities.isPercentage(1)).toBe(false);
	expect(Utilities.isPercentage('25')).toBe(false);
	expect(Utilities.isPercentage('10%')).toBe(true);
	expect(Utilities.isPercentage('2000%')).toBe(true);
	expect(Utilities.isPercentage('1.25%')).toBe(true);
});

test('Between', () => {
	expect(Utilities.between(100, 0, 200)).toBe(true);
	expect(Utilities.between(100, 0, 100)).toBe(false);
	expect(Utilities.between(100, 0, 100, true)).toBe(true);
	expect(Utilities.between(0, 0, 100, true)).toBe(true);
	expect(Utilities.between(0, 0, 100)).toBe(false);
});
