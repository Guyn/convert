export const isPercentage = (n: string): boolean => {
	return typeof n === 'string' && n.indexOf('%') != -1;
};

export const bound = (n: number, max: number) => {
	n = Math.min(max, Math.max(0, n));

	if (Math.abs(n - max) < 0.000001) {
		return 1;
	}

	return (n % max) / max;
};

export const between = function (
	number: number,
	min: number,
	max: number,
	inclusive: boolean = false
) {
	return inclusive
		? number >= min && number <= max
		: number > min && number < max;
};
