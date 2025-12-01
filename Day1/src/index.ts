import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function countZeroCrossings(start: number, distance: number, direction: string): number {
    if (direction === 'L') {
        let end = (start - distance) % 100;
        if (end < 0) end += 100;

        if (start > 0 && distance > start) {

            let crossings = Math.floor((distance - start) / 100) + 1;
            if (end === 0) crossings--;
            return crossings;
        } else if (start === 0 && distance >= 100) {
            let crossings = Math.floor(distance / 100);
            if (end === 0) crossings--;
            return crossings;
        }
    } else {
        let end = (start + distance) % 100;
        const totalPosition = start + distance;

        if (totalPosition >= 100) {
            let crossings = Math.floor(totalPosition / 100);
            if (end === 0) crossings--;
            return crossings;
        }
    }

    return 0;
}

function solvePuzzle(inputPath: string): number {

    const input = fs.readFileSync(inputPath, 'utf-8');
    const lines = input.trim().split('\n');

    let currentPosition = 50;
    let zeroCount = 0;

    console.log(`Starting position: ${currentPosition}`);

    for (const line of lines) {
        const direction = line[0] as string;
        const distance = parseInt(line.slice(1), 10);

        const crossings = countZeroCrossings(currentPosition, distance, direction);
        zeroCount += crossings;

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

