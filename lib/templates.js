const fs = require("fs").promises;
const path = require("path");

exports.GET_EXT_TEMPLATES = (data) => {
	// If its internal or an external directory, just go on.
	if (!data.settings.template) return data;

	let templates = [];

	let templateFiles =
		typeof data.settings.template == "string"
			? [data.settings.template]
			: data.settings.template;

	templateFiles.forEach((file) => {
		templates.push({
			name: path.basename(file),
			file: file,
			path: file
		});
	});
	return {
		...data,
		templates: templates
	};
};

exports.GET_INT_TEMPLATE = async (data) => {
	// If it's external, just continue.
	if (data.settings.template) return data;

	// Process Internal templates
	let types = data.settings.type;
	if (typeof type == "string") types = [...types];
	return {
		...data,
		templates: await fs
			.readdir(path.join(__dirname, "../templates"))
			.then((result) => {
				return result
					.filter((template) => {
						// Filter out any value which is not the template.
						return types.includes(path.extname(template).replace(".", ""));
					})
					.map((file) => {
						return {
							name: path.basename(file),
							file: file,
							path: path.join(__dirname, "../templates", file)
						};
					});
			})
	};
};

exports.GET_TEMPLATE_DATA = async (data) => {
	try {
		return Promise.all(
			data.templates.map(async (file) => {
				return {
					...file,
					data: await fs.readFile(file.path).then((result) => {
						// console.log(result.toString());
						return result.toString();
					})
				};
			})
		).then((result) => {
			// console.log(result);
			return { ...data, templates: result };
		});
	} catch (err) {
		console.log(err);
	}
};
