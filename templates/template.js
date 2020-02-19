export const colors = {
	hex: { 
	<% var i=0; Object.keys(colors).forEach(function(color){ i++; %>
		"<%= _.PascalCase(color) %>": "<%= colors[color] %>"
		<% if (i < Object.keys(colors).length){ %>,<% } %> 
	<% }); %>
	},
	hsl: { 
	<% var i=0; Object.keys(colors).forEach(function(color){ i++; %>
		"<%= _.PascalCase(color) %>": {
			"h": <%= advancedColors[color].h %>,
			"s": <%= advancedColors[color].s %>,
			"l": <%= advancedColors[color].l %>
		}
		<% if (i < Object.keys(colors).length){ %>,<% } %> 
	<% }); %>
	},
	rgb: { 
	<% var i=0; Object.keys(colors).forEach(function(color){ i++; %>
		"<%= _.PascalCase(color) %>": {
			"r": <%= advancedColors[color].r %>,
			"g": <%= advancedColors[color].g %>,
			"b": <%= advancedColors[color].b %>
		}
		<% if (i < Object.keys(colors).length){ %>,<% } %> 
	<% }); %>
	}
}


export const color = (color, type = "hex") => {
	switch (type) {
		case "hex":
			if (colors.hex[color]) return colors.hex[color];
			else return null;
		case "hsl":
			if (colors.hsl[color]) return colors.hsl[color];
			else return null;
		case "rgb":
			if (colors.rgb[color]) return colors.rgb[color];
			else return null;
		default:
			if (colors.hex[color]) return colors.hex[color];
			else return null;
	}
};

export const rgb = (color, alpha = 1) => {
	if (colors.rgb[color])
		return `rgba(${colors.rgb[rgb].r},${colors.rgb[rgb].g},${colors.rgb[rgb].b},alpha)`;
	else return null;
};
export const hsl = (color, alpha = 1) => {
	if (colors.rgb[color])
		return `rgba(${colors.hsl[rgb].r},${colors.hsl[rgb].g},${colors.hsl[rgb].b},alpha)`;
	else return null;
};
