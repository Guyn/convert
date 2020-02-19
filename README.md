# GUYNER

A color convert to different formats. Format your JSON based source file to any file you want.

### Installation

Installation isn't necessary, the script can be used through `npx`.

```bash
npx guyner --src mySourceFile.json --dest /temp --type scss
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

| Argument     | Required                                | Options                             | Description                                                                                                     |
| ------------ | --------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `--src`      | `true`                                  |                                     | The source file (json) or folder (with json files) for your colors                                              |
| `--dest`     | `true`                                  |                                     | Destination folder of the generated files.                                                                      |
| `--type`     | `false` (only if `template` is not set) | `scss`, `less`, `css`, `json`, `js` | The output type of file to be used.                                                                             |
| `--template` | `false` (only if `type` is not set)     |                                     | A template file or folder with files to use to generate the files. When the provided templates arent sufficient |
| `--advanced` | `false`                                 | `hsla`, `rgba`                      | Add more output types to the files.                                                                             |

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
