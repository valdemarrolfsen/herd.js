<h1 align="center">
	<br>
	<br>
	<img width="320" src="https://github.com/valdemarrolfsen/herd.js/raw/main/media/logo.jpeg" alt="Herd.js">
	<br>
	<br>
	<br>
</h1>

> A simple package for cross package development

[![Downloads](https://badgen.net/npm/dt/herd.js)](https://www.npmjs.com/package/herd.js)

Herd.js is a command line tool for syncronizing versioned packages with projects when developing locally. Have you ever published 10 versions of a package just because you could not get the configuration right or you want to see how the changes you made in a package looks in your project? 

This this is the command tool for you!

## Install
```sh
npm install -g herd.js
```

## Usage
```sh
herd -d <project destination> -p <package destination>
```

## Options

`--help` Show help [boolean]

`--version` Show version number [boolean]
  
`-d, --destination`  Destination project where packages should be synced to [string] [required]

`-p, --package` Package sync with the destination project [string] [required]

`-b, --buildPath` Path to build dir of package [string] [default: "dist"]

## Maintainers
- [Valdemar Rolfsen](https://github.com/valdemarrolfsen)