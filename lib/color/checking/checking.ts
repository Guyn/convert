const { between } = require("../../utils");
const { hexType, rgbType, hslType } = require("../../types");

export const isHex = (hex: typeof hexType): boolean => {
	return /^#[0-9A-F]{6}$/i.test(hex);
};

export const isHsl = (hsl: typeof hslType): boolean => {
	if (
		Object.keys(hsl).length == 3 &&
		between(hsl.h, 0, 360, true) &&
		between(hsl.s, 0, 100, true) &&
		between(hsl.l, 0, 100, true)
	) {
		return true;
	}
	return false;
};
export const isHsla = (hsla: typeof hslType): boolean => {
	if (
		Object.keys(hsla).length == 4 &&
		between(hsla.h, 0, 360, true) &&
		between(hsla.s, 0, 100, true) &&
		between(hsla.l, 0, 100, true) &&
		between(hsla.a, 0, 1, true)
	) {
		return true;
	}
	return false;
};
export const isRgb = (rgb: typeof rgbType): boolean => {
	if (
		Object.keys(rgb).length == 3 &&
		between(rgb.r, 0, 255, true) &&
		between(rgb.g, 0, 255, true) &&
		between(rgb.b, 0, 255, true)
	) {
		return true;
	}
	return false;
};

export const isRgba = (rgba: typeof rgbType): boolean => {
	if (
		Object.keys(rgba).length == 4 &&
		between(rgba.r, 0, 255, true) &&
		between(rgba.g, 0, 255, true) &&
		between(rgba.b, 0, 255, true) &&
		between(rgba.a, 0, 1, true)
	) {
		return true;
	}
	return false;
};
