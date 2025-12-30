# [Card Scanner](https://github.com/OverCry/card-scanner)

A [project](https://github.com/OverCry/card-scanner) to try out TenserFlow.js. Previous experience with ML had
previously been at python.

# Table Of Contents

1. [Setup](#Setup)
2. [Main Tools](#Main-Tools)
3. [Deployment/Consistancy](#Deployment/Consistancy)
   1. [gh-pages](#gh-pages)
   2. [husky](#husky)
   3. [craco](#craco)
4. [User Styling](#User-Styling)
   1. [@inquirer/prompts](#@inquirer/prompts)
   2. [chalk](#chalk)

# Setup

The current project is currently set up with:

- OS: `window`
- Terminal: `bash`
- node: `v20.17.0`
- typescript: `5.6.2`

To start:

1. Update `setup.sh` variables
2. Update `interpreter` in `scannerAliases.sh`
3. Run `npm install` to set up the project

### Terminal Commands

TBD: Add script into postinstall to add script into `.zshrc`. To enable `Card Scanner` command to trigger terminal
script which will use `@inquirer/prompts`.

# Deployment/Consistancy

## [gh-pages](https://www.npmjs.com/package/gh-pages)

One of the things this repo is experimenting with is the package `gh-pages`, which has been suggested for deploying
React-based projects as a GitHub page

### Steps

1. Install the package (using your preferred package manager)

```
npm install gh-pages --save-dev
```

2. Setup home directory in `package.json`

```
"homepage": "https://<username>.github.io/<projectname>
```

For this particular case, it becomes `https://overcry.github.io/card-scanner/`

3. Add <b>predeploy</b> and <b>deploy</b> scripts in `package.json`

```
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  },
```

4. When ready, check with `npm run build`
5. When successful, deploy with `npm run deploy`

## [husky](https://typicode.github.io/husky/)

This repo use Husky, which was something I spent some time implementing on my work repo. Personally, I always find that
the steps I've used in the past will end up failing in some way. However, I have found the experience using it worth the
effort in figuring out how to implement Husky into the particular project structure.

These particular steps were done with reference to this
[guide](https://dev.to/shashwatnautiyal/complete-guide-to-eslint-prettier-husky-and-lint-staged-fh9)

### Steps

1. Install relevant packages (using your preferred package manager)

```
npm init @eslint/config
npm i -D husky lint-staged prettier eslint-config-prettier
```

2. Add `.prettierrc`, `.eslintignore`, and `prettierignore` into the root director

3. Add files to ignore (node_modules, etc.) into the `*ignore` files prettier settings into `.prettierrc`. A sample
   would be

```
{
  "arrowParens": "avoid",
  "bracketSpacing": true,
  "htmlWhitespaceSensitivity": "css",
  "insertPragma": false,
  "jsxBracketSameLine": false,
  "jsxSingleQuote": true,
  "printWidth": 120,
  "proseWrap": "always",
  "quoteProps": "as-needed",
  "requirePragma": false,
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "useTabs": false
}
```

4. Initialize husky with `npx husky-init`

5. In `package.json`, add `"lint-staged": "lint-staged"` as a script, as well as

```
  "lint-staged": {
    "*.{js, jsx,ts,tsx}": [
      "eslint --quiet --fix"
    ],
    "*.{json,js,ts,jsx,tsx,html}": [
      "prettier --write --ignore-unknown"
    ]
  },
```

into the file as well

6. Edit `.husky/pre-commit` and change the command to `npm run lint-staged`

## [craco](https://www.npmjs.com/package/@craco/craco)

I tried using craco as I wanted to try using alias for my imports, and from doing some research and asking around, it
seemed like the default `react-scripts` no longer
[supported such functionality](https://github.com/facebook/create-react-app/issues/12047#issuecomment-1214344699).

### Steps

1. Install the package with

```
npm i -D @craco/craco
```

2. Change the start/build/test scripts in `package.json` to use `craco` rather than `react-scripts`

3. Set up a basic `craco.config.ts` file to define the alias we wish to use (which also needs to be replicated in the
   `tsconfig.json` for the alias to function)

## [@inquirer/prompts](https://www.npmjs.com/package/@inquirer/prompts)

Install using:

```
npm i @inquirer/prompts
```

I saw this package being used to beautify the terminal with options. This will allow users to simplify commands that are
executed via terminal.

This package also allows descriptions to be added directly into the terminal, so that even if the developer forgets what
the option represents, they can easily see what it represents

## [chalk](https://www.npmjs.com/package/chalk)

Install using:

```
npm i chalk
```

This package allows colours to appear on terminal. This allows emphasis on certain aspects on teh terminal. This is
being used in conjunction with `@inquirer/prompts` to improve the terminal experience
