const hexToRgb = (hex) => {
	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return regex
		? {
				r: parseInt(regex[1], 16),
				g: parseInt(regex[2], 16),
				b: parseInt(regex[3], 16)
		  }
		: null;
};
exports.hexToRgb = hexToRgb;

const hexToHsl = (hex) => {
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

	return (result = { h: H, s: S, l: L });
};
exports.hexToHsl = hexToHsl;

const rgbToAnsi = (rgb) => {
	const { r, g, b } = rgb;

	// We use the extended greyscale palette here, with the exception of
	// black and white. normal palette only has 4 greyscale shades.
	if (r === g && g === b) {
		if (r < 8) {
			return 16;
		}

		if (r > 248) {
			return 231;
		}

		return Math.round(((r - 8) / 247) * 24) + 232;
	}

	const ansi =
		16 +
		36 * Math.round((r / 255) * 5) +
		6 * Math.round((g / 255) * 5) +
		Math.round((b / 255) * 5);

	return ansi;
};
exports.rgbToAnsi = rgbToAnsi;

const hexToAnsi = (hex) => {
	return rgbToAnsi(hexToRgb(hex));
};
exports.hexToAnsi = hexToAnsi;
