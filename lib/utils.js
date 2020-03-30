const path = require("path");

exports.asyncForEach = async (array, callback) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

exports.WAIT = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("resolved");
		}, 0);
	});
};

exports.pathOnly = (string) => {
	let destDir = string;
	const destArray = string.split("/");
	if (destArray[destArray.length - 1].includes(".")) {
		destArray.pop();
		destDir = destArray.join("/");
	}
	return destDir;
};

exports.isDir = (dir) => {
	return path.extname(path.basename(dir)) ? false : true;
};

exports.getExt = (file) => {
	return path.extname(file.replace(".template", ""));
};
