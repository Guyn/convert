const { bound, between, isOnePointZero, isPercentage } = require("./utils");

test("Bound", () => {
	expect(bound(100, 50)).toBe(1);
	expect(bound(25, 50)).toBe(0.5);
	expect(bound(-100, 50)).toBe(0);
});

test("isOnePointZero", () => {
	expect(isOnePointZero(100)).toBe(false);
	expect(isOnePointZero(25)).toBe(false);
	expect(isOnePointZero(-100)).toBe(false);
	expect(isOnePointZero(1)).toBe(false);
	expect(isOnePointZero("1")).toBe(false);
	expect(isOnePointZero("1.25")).toBe(false);
	expect(isOnePointZero(1.0)).toBe(false);
});

test("isPercentage", () => {
	expect(isPercentage("100")).toBe(false);
	expect(isPercentage("25")).toBe(false);
	expect(isPercentage("10%")).toBe(true);
	expect(isPercentage("2000%")).toBe(true);
	expect(isPercentage("1.25%")).toBe(true);
});

test("Between", () => {
	expect(between(100, 0, 200)).toBe(true);
	expect(between(100, 0, 100)).toBe(false);
	expect(between(100, 0, 100, true)).toBe(true);
	expect(between(0, 0, 100, true)).toBe(true);
	expect(between(0, 0, 100)).toBe(false);
});
