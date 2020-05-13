// Any number between 0 and 360
export type fullCircleType = number & { __isFullCircleType: true };
const isFullCircleType = (x: number): x is fullCircleType => {
	return x >= 0 && x <= 360;
};

// Any number between 0 and 255
export type EightBitype = number & { __isEightBitype: true };
const isEightBitype = (x: number): x is EightBitype => {
	return x >= 0 && x <= 255;
};

// Any number between 0 and 100
export type percentageScaleType = number & { __isPercentageScaleType: true };
const isPercentageScaleType = (x: number): x is percentageScaleType => {
	return x >= 0 && x <= 100;
};

// Any number between 0 and 1
export type UnitIntervalType = number & { __isUnitIntervalType: true };
const isUnitIntervalType = (x: number): x is UnitIntervalType => {
	return x >= 0 && x <= 1;
};

// Number = 0 or 1
export type BinaryType = number & { __isBinary: true };
const isBinary = (x: number): x is BinaryType => {
	return x == 0 || x === 1;
};
