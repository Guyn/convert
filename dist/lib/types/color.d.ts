import { fullCircleType, EightBitype, UnitIntervalType, percentageScaleType } from "./numbers";
export declare type hexType = string & {
    __isHexCode: true;
};
export declare const isHexCode: (x: string) => x is hexType;
export declare type hslType = {
    h: fullCircleType;
    s: percentageScaleType;
    l: percentageScaleType;
};
export declare type hslaType = {
    h: fullCircleType;
    s: percentageScaleType;
    l: percentageScaleType;
    a: UnitIntervalType;
};
export declare type rgbType = {
    r: EightBitype;
    g: EightBitype;
    b: EightBitype;
    a: UnitIntervalType;
};
export declare type rgbaType = {
    r: EightBitype;
    g: EightBitype;
    b: EightBitype;
    a: UnitIntervalType;
};
