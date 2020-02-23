exports.isHex = (hex) => {
	return /^#[0-9A-F]{6}$/i.test(hex);
};
