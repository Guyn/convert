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

| Argument     | Default | Required                                | Options                   | Description                                                                                                     |
| ------------ | ------- | --------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `--src`      | `null`  | `true`                                  |                           | The source file (json) or folder (with json files) for your colors                                              |
| `--dest`     | `null`  | `true`                                  |                           | Destination folder of the generated files.                                                                      |
| `--type`     | `null`  | `false` (only if `template` is not set) | scss, less, css, json, js | The output type of file to be used.                                                                             |
| `--template` | `null`  | `false` (only if `type` is not set)     |                           | A template file or folder with files to use to generate the files. When the provided templates arent sufficient |
