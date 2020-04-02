import { promises as fs } from "fs";
import path from "path";
import log from "cli-block";

const GET_EXT_TEMPLATES = (data: any) => {
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

const GET_INT_TEMPLATES = async (data: any) => {
	// If it's external, just continue.
	if (data.settings.template) return data;

	// Process Internal templates
	let types = data.settings.ext;
	return {
		...data,
		templates: await fs
			.readdir(path.join(__dirname, "../../templates"))
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
							path: path.join(__dirname, "../../templates", file)
						};
					});
			})
	};
};

const GET_TEMPLATE_DATA = async (data: any) => {
	try {
		return Promise.all(
			data.templates.map(async (file) => {
				return {
					...file,
					data: await fs.readFile(file.path).then((result) => {
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

const GET_TEMPLATE_FILES = async (data: any) => {
	return data;
};

const LOG_TEMPLATE_FILES = (data: any) => {
	if (data.templates.length > 1) log.BLOCK_MID("Template files");
	else log.BLOCK_MID("Template file");

	data.templates.forEach((file) => {
		log.BLOCK_LINE(file.name);
	});
	log.BLOCK_LINE();

	if (data.error) log.BLOCK_ERRORS(data.error);
	if (data.warning) log.BLOCK_WARNINGS(data.warning);

	return data;
};
export const TEMPLATES = async (data: any) =>
	GET_TEMPLATE_FILES(data)
		.then(GET_EXT_TEMPLATES)
		.then(GET_INT_TEMPLATES)
		.then(GET_TEMPLATE_DATA)
		.then(LOG_TEMPLATE_FILES)
		.then((res) => {
			// console.log(res);
			return res;
		});
