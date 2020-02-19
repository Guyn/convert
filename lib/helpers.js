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
