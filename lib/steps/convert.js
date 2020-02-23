const { hexToRgb, hexToHsl } = require("../color");
const { WAIT } = require("../utils");
const { bold, yellow } = require("kleur");
const log = require("cli-block");

const CONVERT_COLORDATA = async (data) => {
	await WAIT();
	let dataSets = [];

	data.source.forEach((file) => {
		const colorData = [];

		Object.keys(file.parsed).forEach((color) => {
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

	return { ...data, dataSets: dataSets };
};

const LOG_CONVERTS = (data) => {
	if (data.source.length > 1) log.BLOCK_MID("Source Files");
	else log.BLOCK_MID("Source File");

	data.dataSets.forEach((file) => {
		log.BLOCK_LINE(`${yellow().bold(file.name.toUpperCase())}`);
		log.BLOCK_LINE();
		// LOG.LINE(`${LOG.repeat("-", 100)}`);
		log.BLOCK_ROW_LINE([
			`${bold("name")}`,
			`${bold("hex")}`,
			`${bold("hsl")}`,
			`${bold("rgb")}`
		]);
		log.BLOCK_LINE();

		// console.log(LOG, LOG.spacedText(20, "hoi"));

		file.colors.forEach((color) => {
			log.BLOCK_ROW_LINE([color.name, color.hex, color.hsl, color.rgb]);
		});
		log.BLOCK_LINE();
	});

	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);

	return data;
};

const CONVERT = async (data) =>
	CONVERT_COLORDATA(data)
		.then(LOG_CONVERTS)
		.then((res) => res);

module.exports = { CONVERT };
