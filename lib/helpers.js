// LowerCase
// ex; MyValue > myvalue

const lowercase = (str) => {
	return str.toLowerCase();
};
exports.lowercase = lowercase;

// PascalCase
// ex; my value > MyValue

const PascalCase = (str) => {
	if (!str) return "";
	return String(str)
		.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, "$")
		.replace(/[^A-Za-z0-9]+/g, "$")
		.replace(/([a-z])([A-Z])/g, (m, a, b) => a + "$" + b)
		.toLowerCase()
		.replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};
exports.PascalCase = PascalCase;

// camelCase
// ex; my value > myValue

const camelCase = (str) => {
	if (!str) return "";

	return String(
		PascalCase(str)
			.charAt(0)
			.toLowerCase() + PascalCase(str).slice(1)
	);
};
exports.camelCase = camelCase;

// kebabCase
// ex; my value > my-value

const kebabCase = (str) =>
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.toLowerCase())
		.join("-");
exports.kebabCase = kebabCase;

// snakeCase
// ex; my value > my_value

const snake_case = (str) =>
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.toLowerCase())
		.join("_");
exports.snake_case = snake_case;

// toRoundNumber
// ex; 10.021929911 > 10.02

const toRoundNumber = (num, decimalPlaces = 2) => {
	return Number(
		Math.round(parseFloat(num + "e" + decimalPlaces)) + "e-" + decimalPlaces
	).toFixed(decimalPlaces);
};
exports.toRoundNumber = toRoundNumber;

// safeVariable
// ex; 500px > _500px

exports.safeVariable = (str) => {
	if (!isNaN(str.charAt(0))) return `_${str}`;
	else return str;
};
