export {};
const {
	hexToRgb,
	hexToHsl,
	rgbToHsl,
	hslToRgb,
	hslToHex
} = require('./convert');

test('HEX to RGB', () => {
	expect(hexToRgb('#ff0000')).toStrictEqual({ r: 255, g: 0, b: 0 });
});

test('HEX to HSL', () => {
	expect(hexToHsl('#ff0000')).toStrictEqual({ h: 0, s: 100, l: 50 });
});

test('RGB to HSL', () => {
	expect(rgbToHsl({ r: 255, g: 0, b: 0 })).toStrictEqual({
		h: 0,
		s: 100,
		l: 50
	});
});

test('HSL to RGB', () => {
	expect(hslToRgb({ h: 120, s: 100, l: 50 })).toStrictEqual({
		r: 0,
		g: 255,
		b: 0
	});
});

test('HSL to HEX', () => {
	expect(hslToHex({ h: 120, s: 100, l: 50 })).toStrictEqual('#00ff00');
});
