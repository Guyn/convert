const { lstat, mkdir } = require("fs").promises;

exports.FOLDERS = async (data) => {
	try {
		await lstat(data.settings.destination);
	} catch (err) {
		await mkdir(data.settings.destination, {
			recursive: true
		});
	}
	return data;
};
