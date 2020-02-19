exports.CREATE_DATASETS = (data) => {
	let datasets = [];

	data.files.forEach((file) => {
		const fileData = [];

		Object.keys(file.parsed).forEach((color) => {
			const hexColor = file.parsed[color];
			console.log(color, hexColor);

			// Check if valid hex
			if (/^#[0-9A-F]{6}$/i.test(hexColor)) {
			} else {
				console.log("woops, this aint valid!");
			}
		});
	});

	return data;
};
exports.IS_VALID_COLOR = (data) => {
	return data;
};
