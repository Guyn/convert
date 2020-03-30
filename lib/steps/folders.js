const { pathOnly } = require("../utils");
const { lstat, mkdir } = require("fs").promises;

exports.FOLDERS = async (data) => {
	const destDir = pathOnly(data.settings.destination);

	try {
		await lstat(destDir);
	} catch (err) {
		await mkdir(destDir, {
			recursive: true
		});
	}
	return data;
};
