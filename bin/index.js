#!/usr/bin/env node

const chalk = require("chalk");
const boxen = require("boxen");
const yargs = require("yargs");
const path = require("path");
const fs = require("fs");

const options = yargs
    .usage("Usage: -d destination")
    .option("d", {
        alias: "destination",
        describe: "Destination project where packages should be synced to",
        type: "string",
        demandOption: true,
    })
    .option("p", {
        alias: "package",
        describe: "Package sync with the destination project",
        type: "string",
        demandOption: true,
    })
    .option("b", {
        alias: "buildPath",
        describe: "Path to build dir of package",
        type: "string",
        default: "dist",
    }).argv;

const greeting = chalk.white.bold("Successfully started herd.js");
const boxenOptions = {
    padding: 1,
    margin: 1,
    borderStyle: "round",
    borderColor: "green",
};
const msgBox = boxen(greeting, boxenOptions);

console.log(msgBox);

const destination = chalk.white.bold("Destination:");
const package = chalk.white.bold("Package:");
console.log(destination, options.destination);
console.log(package, options.package);

let rawdata = fs.readFileSync(path.join(options.package, "package.json"));
let packageConfig = JSON.parse(rawdata);

const buildPath = path.join(options.package, options.buildPath);
const destinationPath = path.join(options.destination, "node_modules", packageConfig.name);

fs.cp(
    path.join(options.package, "package.json"),
    path.join(destinationPath, "package.json"),
    { force: true },
    () => {}
);

const eventString = chalk.green.bold("Event:");
var fsTimeout;

fs.watch(buildPath, { recursive: true }, function (event, filename) {
    if (!fsTimeout) {
        fsTimeout = setTimeout(function () {
            fsTimeout = null;
        }, 1000);
        console.log(eventString, filename ?? "A file", "changed. Event:", event);
        fs.cpSync(buildPath, path.join(destinationPath, options.buildPath), { recursive: true, force: true });
    }
});
