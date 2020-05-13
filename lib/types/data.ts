import { hexType, rgbType, hslType } from './color';

interface SettingsType {
	templatePath: string;
	template?: string;
	prefix: string;
	combine: boolean;
	ext: any;
	filename: string;
	title: string;
	src: string;
	dest: any;
	output?: string[];
}
interface FilesType {
	name: string;
	file: string;
	type: string;
	path: string;
	data: string;
	parsed: string;
}

export interface ColorDataType {
	name: string;
	hex: hexType;
	rgb: rgbType;
	hsl: hslType;
}

export interface ColorDataSetType {
	name: string;
	colors: ColorDataType[];
}

export interface DataTypes {
	// name: string;
	settings: SettingsType;
	error: string[];
	warning: string[];
	source: FilesType[];
	dataSets?: ColorDataSetType[];
}
