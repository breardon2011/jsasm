#!/usr/bin/env node
import {processDirectory} from "./functions/conversion";


const currentDir = process.cwd(); // Get the current working directory

// add command line arg handling for different modes
// this is ts -> wasm mode
processDirectory(currentDir)
    .then(() => console.log('Processing complete.'))
    .catch((error) => console.error('An error occurred:', error));
