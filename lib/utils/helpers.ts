// LowerCase
// ex; MyValue > myvalue

export const lowercase = (str: string = '') => {
	return str.toLowerCase();
};

// PascalCase
// ex; my value > MyValue

export const PascalCase = (str: string = '') => {
	if (!str) return '';
	return String(str)
		.replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '$')
		.replace(/[^A-Za-z0-9]+/g, '$')
		.replace(/([a-z])([A-Z])/g, (m, a, b) => a + '$' + b)
		.toLowerCase()
		.replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};

// camelCase
// ex; my value > myValue

export const camelCase = (str: string = '') => {
	if (!str) return '';

	return String(
		PascalCase(str).charAt(0).toLowerCase() + PascalCase(str).slice(1)
	);
};

// kebabCase
// ex; my value > my-value

export const kebabCase = (str: string = '') =>
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.toLowerCase())
		.join('-');

// snakeCase
// ex; my value > my_value

export const snake_case = (str: string = '') =>
	str &&
	str
		.match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
		.map((x) => x.toLowerCase())
		.join('_');

// removeSpecialCharacters
// ex; my value #$#@ > value
export const removeSpecialCharacters = (str: string = '') =>
	str.replace(/[^\w\s]/gi, '');

// toRoundNumber
// ex; 10.021929911 > 10.02

export const toRoundNumber = (
	num: number,
	decimalPlaces: number = 0
): number | string => {
	return Number(
		Math.round(parseFloat(num + 'e' + decimalPlaces)) + 'e-' + decimalPlaces
	).toFixed(decimalPlaces);
};

// safeVariable
// ex; 500px > _500px

export const safeVariable = (str: string = '') => {
	str = removeSpecialCharacters(str).replace(/\s/g, '');
	if (!isNaN(parseInt(str.charAt(0)))) return `_${str}`;
	else return str;
};
