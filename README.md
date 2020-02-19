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
