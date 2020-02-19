const argv = require("yargs").argv;

const settings = {
	settings: {
		src: argv.src ? argv.src : false,
		dest: argv.dest ? argv.dest : false,
		type: argv.type ? argv.type : false,
		template: argv.template ? argv.template : false
	}
};

function makeItAPromise() {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve("resolved");
		}, 0);
	});
}

exports.CHECK_SETTINGS = (data) => {
	const errors = [];
	if (data.settings.template && data.settings.type) {
		errors.push("You can't use a template AND specify an output type.");
	}
	if (!data.settings.template && !data.settings.type) {
		errors.push("You have to specify either a type or a template.");
	}
	return { ...data, error: errors };
};

exports.start = async () => {
	await makeItAPromise();
	return settings;
};
