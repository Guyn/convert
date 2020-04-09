import {
	fullCircleType,
	EightBitype,
	UnitIntervalType,
	percentageScaleType
} from "./numbers";

export type hexType = string & { __isHexCode: true };
export const isHexCode = (x: string): x is hexType => {
	const re = /#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?/g;
	return re.test(x);
};

export type hslType = {
	h: fullCircleType;
	s: percentageScaleType;
	l: percentageScaleType;
};
export type hslaType = {
	h: fullCircleType;
	s: percentageScaleType;
	l: percentageScaleType;
	a: UnitIntervalType;
};

export type rgbType = {
	r: EightBitype;
	g: EightBitype;
	b: EightBitype;
	a: UnitIntervalType;
};
export type rgbaType = {
	r: EightBitype;
	g: EightBitype;
	b: EightBitype;
	a: UnitIntervalType;
};
