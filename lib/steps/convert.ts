import { bold, yellow } from 'kleur';
import * as log from 'cli-block';
import { hexToRgb, hexToHsl } from '../color';
import { WAIT, asyncForEach } from '../utils';
import { DataTypes, ColorDataType, ColorDataSetType } from '../types';

const CONVERT_COLORDATA = async (data: DataTypes): Promise<DataTypes> => {
	await WAIT();
	const dataSets: ColorDataSetType[] = [];

	await asyncForEach(data.source, async (file) => {
		const colorData = [];

		await asyncForEach(Object.keys(file.parsed), (color: string) => {
			const hexColor = file.parsed[color];
			colorData.push({
				name: color,
				hex: hexColor,
				rgb: hexToRgb(hexColor),
				hsl: hexToHsl(hexColor)
			});
		});
		dataSets.push({
			name: file.name,
			colors: colorData
		});
	});

	return { ...data, dataSets };
};

const LOG_CONVERTS = async (data: DataTypes): Promise<DataTypes> => {
	if (data.source.length > 1) log.BLOCK_MID('Source Files');
	else log.BLOCK_MID('Source File');

	await asyncForEach(data.dataSets, async (set: ColorDataSetType[]) => {
		log.BLOCK_LINE(`${yellow().bold(set.name)}`);
		log.BLOCK_LINE();
		// LOG.LINE(`${LOG.repeat("-", 100)}`);
		log.BLOCK_ROW_LINE([
			`${bold('name')}`,
			`${bold('hex')}`,
			`${bold('hsl')}`,
			`${bold('rgb')}`
		]);
		log.BLOCK_LINE();

		// console.log(LOG, LOG.spacedText(20, "hoi"));

		await asyncForEach(set.colors, (value: ColorDataType) => {
			const rowLine = [value.name, value.hex, value.hsl, value.rgb];
			log.BLOCK_ROW_LINE(rowLine);
		});
		log.BLOCK_LINE();
	});

	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);

	return data;
};
const COMBINE_IF_SET = async (data: DataTypes): Promise<DataTypes> => {
	if (!data.settings.combine) return data;

	// const setName = data.dataSets[0].name;
	const combinedSet = data.dataSets[0];
	for (let i = 1; i < data.dataSets.length; i++) {
		combinedSet.colors = [...combinedSet.colors, ...data.dataSets[i].colors];
	}

	return { ...data, dataSets: [combinedSet] };
};

export const CONVERT = async (data) =>
	CONVERT_COLORDATA(data)
		.then(COMBINE_IF_SET)
		.then(LOG_CONVERTS)
		.then((res) => res);
