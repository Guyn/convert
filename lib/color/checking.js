const { between } = require("./utils");

exports.isHex = (hex) => {
	return /^#[0-9A-F]{6}$/i.test(hex);
};

exports.isHsl = (hsl) => {
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
exports.isHsla = (hsl) => {
	if (
		Object.keys(hsl).length == 4 &&
		between(hsl.h, 0, 360, true) &&
		between(hsl.s, 0, 100, true) &&
		between(hsl.l, 0, 100, true) &&
		between(hsl.a, 0, 1, true)
	) {
		return true;
	}
	return false;
};
exports.isRgb = (rgb) => {
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

exports.isRgba = (rgb) => {
	if (
		Object.keys(rgb).length == 4 &&
		between(rgb.r, 0, 255, true) &&
		between(rgb.g, 0, 255, true) &&
		between(rgb.b, 0, 255, true) &&
		between(rgb.a, 0, 1, true)
	) {
		return true;
	}
	return false;
};
