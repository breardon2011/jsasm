#!/usr/bin/env node

import { promises as fsPromises } from 'fs';
import path from 'path';

const { readdir, stat } = fsPromises;

async function listFiles(dir: string): Promise<void> {
    let files: string[];
    try {
        files = await readdir(dir);
    } catch (err) {
        console.error(`Error reading directory ${dir}:`, err);
        return;
    }

    for (const file of files) {
        const filePath = path.join(dir, file);
        try {
            const fileStat = await stat(filePath);
            if (fileStat.isDirectory()) {
                console.log(`[Directory] ${filePath}`);
                await listFiles(filePath); // Recurse into subdirectories
            } else {
                console.log(`[File] ${filePath}`);
            }
        } catch (err) {
            console.error(`Error reading file ${filePath}:`, err);
        }
    }
}

const currentDir = process.cwd(); // Get the current working directory

listFiles(currentDir).catch(console.error);
