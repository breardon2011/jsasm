"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processDirectory = exports.compileToWasm = exports.executeCommand = void 0;
const child_process_1 = require("child_process");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
// Function to execute a shell command
function executeCommand(command) {
    return new Promise((resolve, reject) => {
        (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return reject(error);
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            resolve();
        });
    });
}
exports.executeCommand = executeCommand;
// Function to compile TypeScript to WebAssembly using AssemblyScript
function compileToWasm(inputFile, outputFile) {
    return __awaiter(this, void 0, void 0, function* () {
        const command = `npx asc ${inputFile} --outFile ${outputFile} --optimize`;
        yield executeCommand(command);
        console.log(`Compiled ${inputFile} to ${outputFile}`);
    });
}
exports.compileToWasm = compileToWasm;
// Function to process all .ts files in a directory
function processDirectory(directory) {
    return __awaiter(this, void 0, void 0, function* () {
        const files = fs_1.default.readdirSync(directory);
        for (const file of files) {
            const fullPath = path_1.default.join(directory, file);
            if (fs_1.default.statSync(fullPath).isDirectory()) {
                yield processDirectory(fullPath); // Recurse into subdirectories
            }
            else if (fullPath.endsWith('.ts')) {
                const outputFile = fullPath.replace('.ts', '.wasm');
                yield compileToWasm(fullPath, outputFile);
            }
        }
    });
}
exports.processDirectory = processDirectory;
