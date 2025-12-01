import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function solvePuzzle(inputPath: string): number {

    const input = fs.readFileSync(inputPath, 'utf-8');
    const lines = input.trim().split('\n');

    let currentPosition = 50;
    let zeroCount = 0;

    console.log(`Starting position: ${currentPosition}`);

    for (const line of lines) {
        const direction = line[0];
        const distance = parseInt(line.slice(1), 10);

        if (direction === 'L') {

            currentPosition = (currentPosition - distance) % 100;
            if (currentPosition < 0) {
                currentPosition += 100;
            }
        } else if (direction === 'R') {
            currentPosition = (currentPosition + distance) % 100;
        }

        console.log(`After ${line}: dial points at ${currentPosition}`);

        if (currentPosition === 0) {
            zeroCount++;
        }
    }

    return zeroCount;
}

const inputPath = path.join(__dirname, '../input.txt');
const password = solvePuzzle(inputPath);

console.log(`The password is: ${password}`);

