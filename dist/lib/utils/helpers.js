"use strict";
// LowerCase
// ex; MyValue > myvalue
Object.defineProperty(exports, "__esModule", { value: true });
exports.lowercase = (str = '') => {
    return str.toLowerCase();
};
// PascalCase
// ex; my value > MyValue
exports.PascalCase = (str = '') => {
    if (!str)
        return '';
    return String(str)
        .replace(/^[^A-Za-z0-9]*|[^A-Za-z0-9]*$/g, '$')
        .replace(/[^A-Za-z0-9]+/g, '$')
        .replace(/([a-z])([A-Z])/g, (m, a, b) => a + '$' + b)
        .toLowerCase()
        .replace(/(\$)(\w?)/g, (m, a, b) => b.toUpperCase());
};
// camelCase
// ex; my value > myValue
exports.camelCase = (str = '') => {
    if (!str)
        return '';
    return String(exports.PascalCase(str).charAt(0).toLowerCase() + exports.PascalCase(str).slice(1));
};
// kebabCase
// ex; my value > my-value
exports.kebabCase = (str = '') => str &&
    str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x) => x.toLowerCase())
        .join('-');
// snakeCase
// ex; my value > my_value
exports.snake_case = (str = '') => str &&
    str
        .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
        .map((x) => x.toLowerCase())
        .join('_');
// removeSpecialCharacters
// ex; my value #$#@ > value
exports.removeSpecialCharacters = (str = '') => str.replace(/[^\w\s]/gi, '');
// toRoundNumber
// ex; 10.021929911 > 10.02
exports.toRoundNumber = (num, decimalPlaces = 0) => {
    return Number(Math.round(parseFloat(num + 'e' + decimalPlaces)) + 'e-' + decimalPlaces).toFixed(decimalPlaces);
};
// safeVariable
// ex; 500px > _500px
exports.safeVariable = (str = '') => {
    str = exports.removeSpecialCharacters(str).replace(/\s/g, '');
    if (!isNaN(parseInt(str.charAt(0))))
        return `_${str}`;
    else
        return str;
};
//# sourceMappingURL=helpers.js.map