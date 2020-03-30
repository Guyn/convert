# @Guyn/convert

A color convert to different formats. Format your JSON based source file to any file you want.

### Installation

Installation isn't necessary, the script can be used through `npx`.

```bash
npx @guyn/convert --src mySourceFile.json --dest /temp --type scss
```

But if you really want it in your project, you can install it using npm;

```bash
npm install guyner
```

or Yarn;

```bash
yarn add guyner
```

### Arguments

| Argument     | Required                          | Options                                     | Description                                                                                                                                                                                       |
| ------------ | --------------------------------- | ------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--src`      | ✔                                 | file / path `string`                        | The source file (json) or folder (with json files) for your colors                                                                                                                                |
| `--dest`     | ✔                                 | file / path `string`                        | Destination folder of the generated files.                                                                                                                                                        |
| `--type`     | × (only if `template` is not set) | `scss`, `less`, `css`, `json`, `js`, `yaml` | The output type of file to be used.                                                                                                                                                               |
| `--template` | × (only if `type` is not set)     | `string`                                    | A template file or folder with files to use to generate the files. When the provided templates arent sufficient                                                                                   |
| `--advanced` | ×                                 | `hsla`, `rgba`                              | Add more output types to the files.                                                                                                                                                               |
| `--prefix`   | ×                                 | `boolean`                                   | A prefix will be used within the fixes to prefix variables or objects                                                                                                                             |
| `--combine`  | ×                                 | `boolean`                                   | When given multiple sources, they can be combined into one output file                                                                                                                            |
| `--filename` | ×                                 | `string`                                    | You can give an altername output name for your file. They will use they extension of your template. When given multiple destinations (not combined) you need to give the same amount of filenames |
| `--title`    | ×                                 | `string`                                    | The Set name used in the procreate file. For now this is only need when you generate Procreate swatches                                                                                           |

### Usage

@guyn/convert can be used as a `npx` script or as a node_module in your package. The easiest way is to install it and use it in a script in your package.json like;

```json
// package.json
{
	"scripts": {
		"convert-colors": "guyner --src assets/my-colors.json --dest src/assets/scss/ --type scss"
	}
}
```

You could also, due to the total amount of arguments which could be big, create a bash script which can be ran by the scripts.

```json
// package.json
{
	"scripts": {
		"convert-colors": "sh scripts/colors.sh"
	}
}
```

```bash
echo "> 01: Create a SCSS file from source"
npx guyner \
     --src assets/my-colors.json \
     --dest src/assets/scss/ \
     --type scss
     --type css
```

### Custom templates

Besides the templates already made which can be used easily. You an also define your own template. Templates are using the ejs template syntax.

Examples can be found in the `/templates` folder of this package.

Example of the css template;

```

:root{
<% var i=0; Object.keys(colors).forEach(function(color){ i++; %>
--<%= settings.prefix %><%= colors[color].name %>: <%= colors[color].hex %>;
--<%= settings.prefix %><%= colors[color].name %>-hue: <%= colors[color].hsl.h %>;
--<%= settings.prefix %><%= colors[color].name %>-saturation: <%= colors[color].hsl.s %>;
--<%= settings.prefix %><%= colors[color].name %>-lightness: <%= colors[color].hsl.l %>;
--<%= settings.prefix %><%= colors[color].name %>-red: <%= colors[color].rgb.r %>;
--<%= settings.prefix %><%= colors[color].name %>-green: <%= colors[color].rgb.g %>;
--<%= settings.prefix %><%= colors[color].name %>-blue: <%= colors[color].rgb.b %>;
<% }); %>
}

```

### Procreate Swatches

Convert can also create Procreate swatch files in the same matter as it does any other files. For this you will need to add a title and make sure you set a output file;

#### In package json script;

_package.json_

```
...
	"build:procreate": "guyn@convert --src src/yourfile.json --dest dist/Yourfile.swatches --title Yourfile --type procreate
...
```

#### In a shell file;

Or on a bash file (procreate.sh);

_package.json_

```
...
	"build:procreate": "node scripts/procreate.sh"
...
```

_scripts/procreate.sh_

```
node node_modules/guyn/convert/dist/cli.js \
    --src test/source/valid/source1.json \
    --dest tmp/01-procreate/Test.swatches \
    --title GuynTest \
    --type procreate \
```

## Wishlist

- Add support for rgba, hsla and 3 digix colors.
- Add option to be able to use depth in source files.

## Contributing

Any help to make this package better is very welcome! So if you like this idea and have a good idea for refactor, update, write better docs or add features. Please feel free to contact me or just make a PR.

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Author

**guyner** © [Sil van Diepen](https://github.com/silvandiepen), Released under the [MIT](./LICENSE) License.<br>
Authored and maintained by Sil van Diepen with help from contributors ([list](https://github.com/silvandiepen/guyner/contributors)).

[github.com/silvandiepen](https://github.com/silvandiepen) · GitHub [@Sil van Diepen](https://github.com/silvandiepen) · Twitter [@silvandiepen](https://twitter.com/silvandiepen)

```

```
