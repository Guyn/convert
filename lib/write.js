const fs = require("fs").promises;
const path = require("path");
const { asyncForEach } = require("./helpers");
const ejs = require("ejs");
const helpers = require("./helpers");
const { WRITE_FILE_ERROR, WRITE_FILE_SUCCESS } = require("./log");

exports.CREATE_DEST = async (data) => {
	try {
		await fs.lstat(data.settings.dest);
	} catch (err) {
		await fs.mkdir(data.settings.dest, {
			recursive: true
		});
	}
	return data;
};

exports.BUILD_FILES = async (data) => {
	let readyFiles = [];

	await asyncForEach(data.templates, async (template) => {
		// console.log(set);
		await asyncForEach(data.dataSets, (set) => {
			let destPath =
				data.dataSets.length > 1
					? path.join(data.settings.dest, set.name + "-" + template.name)
					: path.join(data.settings.dest, template.name);
			readyFiles.push({
				name: template.name,
				data: ejs.render(template.data, {
					settings: data.settings,
					colors: set.colors,
					_: helpers
				}),
				path: destPath.replace(".template", "")
			});
		});
	});
	return { ...data, readyFiles: readyFiles };
};

exports.WRITE_FILES = async (data) => {
	await asyncForEach(data.readyFiles, async (set) => {
		await fs
			.writeFile(set.path, set.data)
			.finally(() => {
				WRITE_FILE_SUCCESS(set.path);
			})
			.catch((err) => {
				WRITE_FILE_ERROR(err);
			});
	});
};
