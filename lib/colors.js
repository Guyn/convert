const { hexToRgb, hexToHsl } = require("./convert");
const path = require("path");
exports.CREATE_DATASETS = (data) => {
	let dataSets = [];

	data.files.forEach((file) => {
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
exports.IS_VALID_COLOR = (data) => {
	return data;
};
