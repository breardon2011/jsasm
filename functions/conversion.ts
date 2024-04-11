import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

// Function to execute a shell command
export function executeCommand(command: string): Promise<void> {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
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

// Function to compile TypeScript to WebAssembly using AssemblyScript
export async function compileToWasm(inputFile: string, outputFile: string): Promise<void> {
    const command = `npx asc ${inputFile} --outFile ${outputFile} --optimize`;
    await executeCommand(command);
    console.log(`Compiled ${inputFile} to ${outputFile}`);
}

// Function to process all .ts files in a directory
export async function processDirectory(directory: string): Promise<void> {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            await processDirectory(fullPath); // Recurse into subdirectories
        } else if (fullPath.endsWith('.ts')) {
            const outputFile = fullPath.replace('.ts', '.wasm');
            await compileToWasm(fullPath, outputFile);
        }
    }
}


