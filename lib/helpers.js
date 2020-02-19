const stringWidth = require("mono-str-width");
const { red, blue, green, italic } = require("kleur");

exports.camelCase = (str) => {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, function(word, index) {
			return index == 0 ? word.toUpperCase() : word.toUpperCase();
		})
		.replace(/\s+/g, "");
};

exports.lowercase = (str) => {
	return str.toLowerCase();
};

exports.PascalCase = (str) => {
	if (!str) return "";
	return String(str)
		.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
		.replace(/[^A-Za-z0-9]+/g, "$")
		.replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
		.toLowerCase()
		.replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};

exports.hexToRgb = (hex) => {
	const regex = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	return result
		? {
				r: parseInt(regex[1], 16),
				g: parseInt(regex[2], 16),
				b: parseInt(regex[3], 16)
		  }
		: null;
};

exports.hexToHsl = (hex) => {
	const rgb = hexToRgb(hex);

	const r1 = rgb.r / 255;
	const g1 = rgb.g / 255;
	const b1 = rgb.b / 255;

	const maxColor = Math.max(r1, g1, b1);
	const minColor = Math.min(r1, g1, b1);
	//Calculate L:
	let L = (maxColor + minColor) / 2;
	let S = 0;
	let H = 0;
	if (maxColor != minColor) {
		//Calculate S:
		if (L < 0.5) {
			S = (maxColor - minColor) / (maxColor + minColor);
		} else {
			S = (maxColor - minColor) / (2.0 - maxColor - minColor);
		}
		//Calculate H:
		if (r1 == maxColor) {
			H = (g1 - b1) / (maxColor - minColor);
		} else if (g1 == maxColor) {
			H = 2.0 + (b1 - r1) / (maxColor - minColor);
		} else {
			H = 4.0 + (r1 - g1) / (maxColor - minColor);
		}
	}

	L = L * 100;
	S = S * 100;
	H = H * 60;
	if (H < 0) {
		H += 360;
	}
	return (result = { h: H, s: S, l: L });
};

exports.asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

// Loggin Helpers

exports.spaces = (num, value = null) => {
	let spaces = [];
	for (let i = 0; i < (value ? num - stringWidth(value) : num); i++) {
		spaces.push(" ");
	}
	return spaces.join("");
};

exports.repeat = (num, value = null) => {
	let values = [];
	for (let i = 0; i < num; i++) {
		values.push(value);
	}
	return values.join("");
};

exports.stylelizeValue = (value) => {
	if (typeof value !== "boolean" && !value) return "";
	let stringValue = value.toString();
	// if (typeof value !== "string") return value;
	if (stringValue == "true") return `${green("True")}`;
	else if (stringValue == "false") return `${red("False")}`;
	else if (stringValue.includes("/")) return `${blue().italic(stringValue)}`;
	else return stringValue;
};

exports.centerText = (num, value) => {
	let values = [];
	let isEven = stringWidth(value) % 2 == 0 ? true : false;
	num = (num - stringWidth(value)) / 2;
	for (let i = 0; i < num; i++) values.push(" ");
	values.push(value);
	for (let i = 0; i < num - (isEven ? 0 : 1); i++) values.push(" ");

	return values.join("");
};

exports.hexText = (txt) => {
	return txt;
};

exports.hexBg = (txt) => {
	return txt;
};
