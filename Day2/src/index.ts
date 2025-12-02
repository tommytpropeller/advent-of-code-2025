import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const hasRepeatedDigits = (number: number) => {
    const digits = number.toString();

    if (digits.length % 2 !== 0) return false;

    const middle = digits.length / 2;
    const left = digits.slice(0, middle);
    const right = digits.slice(middle);

    return left === right;
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

