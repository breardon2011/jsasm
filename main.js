#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const conversion_1 = require("./functions/conversion");
const currentDir = process.cwd(); // Get the current working directory
// add command line arg handling for different modes
// this is ts -> wasm mode
(0, conversion_1.processDirectory)(currentDir)
    .then(() => console.log('Processing complete.'))
    .catch((error) => console.error('An error occurred:', error));
