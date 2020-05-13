export {};
const { isHex, isHsl, isRgb, isHsla, isRgba } = require('./checking');

test('isHex', () => {
	expect(isHex('#ff0000')).toBe(true);
	expect(isHex('#ffgg00')).toBe(false);
	expect(isHex('#ffaa00')).toBe(true);
	expect(isHex('#ff00000')).toBe(false);
	expect(isHex({ hex: '#ff0000' })).toBe(false);
	expect(isHex('ff0000')).toBe(false);
});
test('isHsl', () => {
	expect(isHsl({ h: 0, s: 0, l: 0 })).toBe(true);
	expect(isHsl({ h: 0, s: 0, l: 0, a: 1 })).toBe(false);
	expect(isHsl({ h: 100, s: 100, l: 100 })).toBe(true);
	expect(isHsl({ h: 100, s: 100, l: 100 })).toBe(true);
	expect(isHsl({ h: 100, s: 100, l: 120 })).toBe(false);
	expect(isHsl({ h: 100, s: 100, l: -0.5 })).toBe(false);
	expect(isHsl({ h: 360, s: 100, l: 50 })).toBe(true);
	expect(isHsl([100, 100, 10])).toBe(false);
});
test('isHsla', () => {
	expect(isHsla({ h: 0, s: 0, l: 0 })).toBe(false);
	expect(isHsla({ h: 100, s: 100, l: 100, a: 1 })).toBe(true);
	expect(isHsla({ h: 100, s: 100, l: 100, a: 2 })).toBe(false);
	expect(isHsla({ h: 100, s: 100, l: 100, a: 0 })).toBe(true);
});

test('isRgb', () => {
	expect(isRgb({ r: 0, g: 0, b: 0 })).toBe(true);
	expect(isRgb({ r: 100, g: 100, b: 100 })).toBe(true);
	expect(isRgb({ r: 100, g: 100, b: 100 })).toBe(true);
	expect(isRgb({ r: 500, g: 100, b: 120 })).toBe(false);
	expect(isRgb({ r: 100, g: 100, b: -0.5 })).toBe(false);
	expect(isRgb({ r: 360, g: 100, b: 255 })).toBe(false);
	expect(isRgb({ r: 360, g: 100, b: 255, a: 1 })).toBe(false);
	expect(isRgb([100, 100, 10])).toBe(false);
});

test('isRgba', () => {
	expect(isRgba({ r: 0, g: 0, b: 0 })).toBe(false);
	expect(isRgba({ r: 100, g: 100, b: 100, a: 1 })).toBe(true);
	expect(isRgba({ r: 100, g: 100, b: 100, a: 0 })).toBe(true);
	expect(isRgba({ r: 100, g: 100, b: 100, a: 3 })).toBe(false);
});
