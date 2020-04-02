const { bound } = require("../../utils");
const { hexType, rgbType, hslType } = require("../../types");

export const hexToRgb = (hex: typeof hexType): typeof rgbType => {
	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return regex
		? {
				r: parseInt(regex[1], 16),
				g: parseInt(regex[2], 16),
				b: parseInt(regex[3], 16)
		  }
		: null;
};

export const hexToHsl = (hex: typeof hexType): typeof hslType => {
	const rgb = hexToRgb(hex);

	const r1 = rgb.r / 255,
		g1 = rgb.g / 255,
		b1 = rgb.b / 255;

	const maxColor = Math.max(r1, g1, b1),
		minColor = Math.min(r1, g1, b1);

	//Calculate L:
	let L = (maxColor + minColor) / 2,
		S = 0,
		H = 0;

	if (maxColor != minColor) {
		//Calculate S:
		if (L < 0.5) S = (maxColor - minColor) / (maxColor + minColor);
		else S = (maxColor - minColor) / (2.0 - maxColor - minColor);

		//Calculate H:
		if (r1 == maxColor) H = (g1 - b1) / (maxColor - minColor);
		else if (g1 == maxColor) H = 2.0 + (b1 - r1) / (maxColor - minColor);
		else H = 4.0 + (r1 - g1) / (maxColor - minColor);
	}

	L = L * 100;
	S = S * 100;
	H = H * 60;
	if (H < 0) H += 360;

	return { h: H, s: S, l: L };
};

export const rgbToHsl = (rgb: typeof rgbType): typeof hslType => {
	(rgb.r /= 255), (rgb.g /= 255), (rgb.b /= 255);
	const max = Math.max(rgb.r, rgb.g, rgb.b),
		min = Math.min(rgb.r, rgb.g, rgb.b);
	let h,
		s,
		l = (max + min) / 2;

	if (max == min) {
		h = s = 0; // achromatic
	} else {
		var d = max - min;
		s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
		switch (max) {
			case rgb.r:
				h = (rgb.g - rgb.b) / d + (rgb.g < rgb.b ? 6 : 0);
				break;
			case rgb.g:
				h = (rgb.b - rgb.r) / d + 2;
				break;
			case rgb.b:
				h = (rgb.r - rgb.g) / d + 4;
				break;
		}
		h /= 6;
	}

	return {
		h: h,
		s: s * 100,
		l: l * 100
	};
};

export const hueToRgb = (p: number, q: number, t: number): number => {
	if (t < 0) t += 1;
	if (t > 1) t -= 1;
	if (t < 1 / 6) return p + (q - p) * 6 * t;
	if (t < 1 / 2) return q;
	if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
	return p;
};
export const hslToRgb = (hsl: typeof hslType): typeof rgbType => {
	let r = 0;
	let g = 0;
	let b = 0;

	let h = bound(hsl.h, 360);
	let s = bound(hsl.s, 100);
	let l = bound(hsl.l, 100);

	if (s === 0) {
		r = g = b = l; // achromatic
	} else {
		var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		var p = 2 * l - q;
		r = hueToRgb(p, q, h + 1 / 3);
		g = hueToRgb(p, q, h);
		b = hueToRgb(p, q, h - 1 / 3);
	}

	return { r: r * 255, g: g * 255, b: b * 255 };
};

export const hslToHex = (hsl: typeof hslType): typeof hexType => {
	let rgb = hslToRgb(hsl);
	return rgb && Object.keys(rgb).length === 3
		? "#" +
				("0" + parseInt(rgb.r, 10).toString(16)).slice(-2) +
				("0" + parseInt(rgb.g, 10).toString(16)).slice(-2) +
				("0" + parseInt(rgb.b, 10).toString(16)).slice(-2)
		: "";
};
