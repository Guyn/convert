export {};
const {
	lowercase,
	PascalCase,
	camelCase,
	kebabCase,
	snake_case,
	toRoundNumber,
	safeVariable,
	removeSpecialCharacters
} = require('./');

test('lowercase', () => {
	expect(lowercase('Wooohoo')).toBe('wooohoo');
	expect(lowercase('THIS IS ALL UPPERCASE')).toBe('this is all uppercase');
	expect(lowercase('Wooohoo 243')).toBe('wooohoo 243');
});

test('PascalCase', () => {
	expect(PascalCase('Wooohoo')).toBe('Wooohoo');
	expect(PascalCase('Some random string')).toBe('SomeRandomString');
	expect(PascalCase('THIS IS ALL UPPERCASE')).toBe('ThisIsAllUppercase');
});

test('camelCase', () => {
	expect(camelCase('Wooohoo')).toBe('wooohoo');
	expect(camelCase('Some random string')).toBe('someRandomString');
	expect(camelCase('THIS IS ALL UPPERCASE')).toBe('thisIsAllUppercase');
});
test('kebabCase', () => {
	expect(kebabCase('Wooohoo')).toBe('wooohoo');
	expect(kebabCase('Some random string')).toBe('some-random-string');
	expect(kebabCase('THIS IS ALL UPPERCASE')).toBe('this-is-all-uppercase');
});
test('snake_case', () => {
	expect(snake_case('Wooohoo')).toBe('wooohoo');
	expect(snake_case('Some random string')).toBe('some_random_string');
	expect(snake_case('THIS IS ALL UPPERCASE')).toBe('this_is_all_uppercase');
});

test('toRoundNumber', () => {
	expect(toRoundNumber(100.34343242)).toBe('100');
	expect(toRoundNumber(100.74343242)).toBe('101');
	expect(toRoundNumber(100.34643242, 2)).toBe('100.35');
	expect(toRoundNumber(100.74343242, 2)).toBe('100.74');
});

test('removeSpecialCharacters', () => {
	expect(removeSpecialCharacters('Some Variable')).toBe('Some Variable');
	expect(removeSpecialCharacters('^%#500px Variable')).toBe('500px Variable');
});

test('safeVariable', () => {
	expect(safeVariable('Some Variable')).toBe('SomeVariable');
	expect(safeVariable('500px Variable')).toBe('_500pxVariable');
});
