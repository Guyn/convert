"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
test('lowercase', () => {
    expect(_1.lowerCase('Wooohoo')).toBe('wooohoo');
    expect(_1.lowerCase('THIS IS ALL UPPERCASE')).toBe('this is all uppercase');
    expect(_1.lowerCase('Wooohoo 243')).toBe('wooohoo 243');
});
test('PascalCase', () => {
    expect(_1.pascalCase('Wooohoo')).toBe('Wooohoo');
    expect(_1.pascalCase('Some random string')).toBe('SomeRandomString');
    expect(_1.pascalCase('THIS IS ALL UPPERCASE')).toBe('ThisIsAllUppercase');
});
test('camelCase', () => {
    expect(_1.camelCase('Wooohoo')).toBe('wooohoo');
    expect(_1.camelCase('Some random string')).toBe('someRandomString');
    expect(_1.camelCase('THIS IS ALL UPPERCASE')).toBe('thisIsAllUppercase');
});
test('kebabCase', () => {
    expect(_1.kebabCase('Wooohoo')).toBe('wooohoo');
    expect(_1.kebabCase('Some random string')).toBe('some-random-string');
    expect(_1.kebabCase('THIS IS ALL UPPERCASE')).toBe('this-is-all-uppercase');
});
test('snake_case', () => {
    expect(_1.snakeCase('Wooohoo')).toBe('wooohoo');
    expect(_1.snakeCase('Some random string')).toBe('some_random_string');
    expect(_1.snakeCase('THIS IS ALL UPPERCASE')).toBe('this_is_all_uppercase');
});
test('toRoundNumber', () => {
    expect(_1.toRoundNumber(100.34343242)).toBe('100');
    expect(_1.toRoundNumber(100.74343242)).toBe('101');
    expect(_1.toRoundNumber(100.34643242, 2)).toBe('100.35');
    expect(_1.toRoundNumber(100.74343242, 2)).toBe('100.74');
});
test('removeSpecialCharacters', () => {
    expect(_1.removeSpecialCharacters('Some Variable')).toBe('Some Variable');
    expect(_1.removeSpecialCharacters('^%#500px Variable')).toBe('500px Variable');
});
test('safeVariable', () => {
    expect(_1.safeVariable('Some Variable')).toBe('SomeVariable');
    expect(_1.safeVariable('500px Variable')).toBe('_500pxVariable');
});
//# sourceMappingURL=helpers.test.js.map