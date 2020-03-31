const isPercentage = (n) => {
	return typeof n === "string" && n.indexOf("%") != -1;
};
exports.isPercentage = isPercentage;

const isOnePointZero = (n) => {
	return typeof n == "string" && n.indexOf(".") != -1 && parseFloat(n) === 1;
};
exports.isOnePointZero = isOnePointZero;

const bound = (n, max) => {
	if (isOnePointZero(n)) {
		n = "100%";
	}

	var processPercent = isPercentage(n);
	n = Math.min(max, Math.max(0, parseFloat(n)));

	if (processPercent) {
		n = parseInt(n * max, 10) / 100;
	}

	if (Math.abs(n - max) < 0.000001) {
		return 1;
	}

	return (n % max) / parseFloat(max);
};
exports.bound = bound;
