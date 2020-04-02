const path = require("path");

export const asyncForEach = async (array: any, callback: any) => {
	for (let index = 0; index < array.length; index++) {
		await callback(array[index], index, array);
	}
};

export const WAIT = async () => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("resolved");
		}, 0);
	});
};

export const pathOnly = (string: string) => {
	let destDir = string;
	const destArray = string.split("/");
	if (destArray[destArray.length - 1].includes(".")) {
		destArray.pop();
		destDir = destArray.join("/");
	}
	return destDir;
};

export const isDir = (dir: string) => {
	return path.extname(path.basename(dir)) ? false : true;
};

export const getExt = (file: string) => {
	return path.extname(file.replace(".template", ""));
};
