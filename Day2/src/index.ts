import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hasRepeatedDigits = (number: number) => {
    const digits = number.toString();
    const len = digits.length;

    for (let patternLen = 1; patternLen <= len / 2; patternLen++) {
        if (len % patternLen !== 0) continue;

        const pattern = digits.slice(0, patternLen);
        const repeated = pattern.repeat(len / patternLen);

        if (repeated === digits) return true;
    }

    return false;
}

const checkRange = (from: number, to: number) => {
    let total = 0;
    const found: number[] = [];

    for (let n = from; n <= to; n++) {
        if (hasRepeatedDigits(n)) {
            found.push(n);
            total += n;
        }
    }

    if (found.length > 0) {
        console.log(`${from}-${to}: ${found.join(', ')}`);
    }

    return total;
}

const solvePuzzle = (file: string) => {
    const data = fs.readFileSync(file, 'utf-8').trim();
    const ranges = data.split(',');

    let answer = 0;

    for (const range of ranges) {
        const [start, end] = range.trim().split('-');
        if (!start || !end) continue;

        answer += checkRange(Number(start), Number(end));
    }

    return answer;
}

const input = path.join(__dirname, '../input.txt');
const answer = solvePuzzle(input);

console.log(`\nAnswer: ${answer}`);

