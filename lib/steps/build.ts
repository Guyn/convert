import path from "path";
import ejs from "ejs";
import { asyncForEach, WAIT, isDir, getExt, helpers } from "../utils";

import log from "cli-block";

const BUILD_CHECK_FILENAMES = async (data: any) => {
	await WAIT();
	const error = [];

	if (!data.settings.filename) return data;

	if (data.settings.filename.length < 2) {
		let filenames = [];
		if (data.dataSets.length > 1) {
			let i = 0;
			data.dataSets.forEach((set) => {
				i++;
				filenames.push(data.settings.filename + `-${i}`);
			});
			data.settings.filename = filenames;
		}
	} else {
		if (data.settings.filename.length !== data.dataSets.length)
			if (data.settings.filename.length > data.dataSets.length) {
				error.push("You have more filenames, than source files");
			} else {
				error.push("You have more sourcefiles, than filenames");
			}
	}

	return { ...data, error: error };
};

const BUILD_LOG_ERRORS = (data: any) => {
	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);
	return data;
};
const BUILD_FILES = async (data: any) => {
	let files = [];

	await asyncForEach(data.templates, async (template) => {
		let i = 0;
		await asyncForEach(data.dataSets, (set) => {
			const settingDestination = data.settings.destination;

			let fileName, filePath, dirPath, extension;

			if (isDir(settingDestination)) {
				dirPath = settingDestination;
				fileName = set.name + getExt(template.name);
			} else {
				dirPath = settingDestination.replace(
					path.basename(settingDestination),
					""
				);
				fileName = path.basename(settingDestination);
			}

			// Get the extension
			extension = getExt(fileName);

			// When there are filenames defined by settings
			if (data.settings.filename)
				fileName = data.settings.filename[i] + extension;

			// fileName = fileName.replace(".template", "");
			filePath = path.join(dirPath, fileName);

			files.push({
				name: fileName,
				ext: extension,
				data: ejs.render(template.data, {
					settings: data.settings,
					colors: set.colors,
					_: { ...helpers }
				}),
				path: filePath
			});
			i++;
		});
	});

	return { ...data, files: files };
};

export const BUILD = async (data: any) =>
	BUILD_CHECK_FILENAMES(data)
		.then(BUILD_LOG_ERRORS)
		.then(BUILD_FILES)
		.then((res) => res);
