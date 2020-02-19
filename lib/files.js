const fs = require("fs").promises;
const { asyncForEach } = require("./helpers.js");
const path = require("path");
// const log = require("./log");

exports.CHECK_SOURCE = async (data) => {
	if (!data.settings.src) return data;

	const stats = await fs.lstat(data.settings.src);
	if (stats.isDirectory()) data.settings.srcType = "dir";
	else if (stats.isFile()) data.settings.srcType = "file";
	return data;
};

exports.GET_SOURCE = async (data) => {
	if (!data.settings.src) return { ...data };

	const srcFiles = [];

	switch (data.settings.srcType) {
		case "dir":
			await fs.readdir(data.settings.src).then(async (dir) => {
				await asyncForEach(dir, async (file) => {
					const fileData = await fs
						.readFile(path.join(data.settings.src, file))
						.then((res) => {
							return res.toString();
						});
					srcFiles.push({
						name: path.basename(file).replace(path.extname(file), ""),
						file: path.basename(file),
						type: path.extname(file),
						path: path.join(data.settings.src, file),
						data: fileData,
						parsed: JSON.parse(fileData)
					});
				});
			});
			break;
		case "file":
			const fileData = await fs.readFile(data.settings.src).then((res) => {
				return res.toString();
			});
			srcFiles.push({
				name: path
					.basename(data.settings.src)
					.replace(path.extname(data.settings.src), ""),
				file: path.basename(data.settings.src),
				type: path.extname(data.settings.src),
				path: data.settings.src,
				data: fileData,
				parsed: JSON.parse(fileData)
			});
			break;
	}
	return { ...data, files: srcFiles };
};

exports.FILTER_FILES = (data) => {
	return { ...data, files: data.files.filter((file) => file.type == ".json") };
};

const isHex = (hex) => {
	return /^#[0-9A-F]{6}$/i.test(hex);
};

exports.CHECK_FILES = async (data) => {
	// Filter files for json.
	let errors = [];
	let warnings = [];

	data.files.forEach((file) => {
		if (file.type !== ".json") {
			let txt = `${file.name} is not a JSON file and won't be used as a source`;
			if (data.files.length > 1) warnings.push(txt);
			else errors.push(txt);
		}

		let jsonFile = JSON.parse(file.data);

		if (Object.keys(jsonFile).length < 1)
			errors.push(`${file.name} doesn't have any valid values.`);
		else if (Object.keys(jsonFile).length < 2)
			warnings.push(`${file.name} has only one value`);

		Object.keys(jsonFile).forEach((entry) => {
			if (typeof jsonFile[entry] !== "string") {
				errors.push(`${entry} does not have a valid value in ${file.name}`);
				return;
			}
			// Check if valid hex
			if (!isHex(jsonFile[entry]))
				errors.push(
					`${entry} (${jsonFile[entry]}) does not have a valid hex value in ${file.name}`
				);
		});
		// Check if it has atleast multiple entries
	});

	return { ...data, error: [...data.error, ...errors], warning: warnings };
};
