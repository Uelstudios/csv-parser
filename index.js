/**
 * CSV Parser
 * Parse any csv file or string to json.
 *
 * Copyright 2019
 * Paul von Allwörden
 *
 * Last edit: 02:58 - 13.11.2019
 */

const DELIMITER = ",";

/**
 * Parse raw csv data into a two dimensional array.
 *
 * @param {string} csv The raw csv data
 * @returns {[][]} Rows of data
 */
function parse(raw) {
    // Split lines
    const lines = raw.split("\n");

    // Split lines into rows with cells.
    const rows = [];
    for (let i = 0; i < lines.length; i++) {
        const row = splitLine(lines[i]);
        if (row.length > 0) rows.push(row);
    }

    return rows;
}

/**
 * Given a string with delimiters this function will
 * split it taking quotes into account.
 * 
 * @param {string} line The line to split
 * @returns {string[]} The seperated cells. 
 */
function splitLine(line) {
    line = line.trim();

    let cells = [];
    let curCell = "";
    let quoteSymbolCount = 0;
    for (let i = 0; i < line.length; i++) {
        let char = line[i];

        // Count the number of quotes
        if (char === "\"") {
            quoteSymbolCount++;
        }

        // If a delimiter is reached and the quote count is even, add
        // the current cell to the list and clear the current cell.
        if ((char === DELIMITER && isEven(quoteSymbolCount))) {
            cells.push(parseCellValue(curCell));
            curCell = "";
            quoteSymbolCount = 0;

            // Do not add delimiter to cell.
            continue;
        }

        // Add char to the current cell
        curCell += char;

        // We reached the end of the line
        if (i + 1 >= line.length) {
            cells.push(parseCellValue(curCell));
        }
    }

    return cells;
}

/**
 * Given a string, this function will convert it to
 * a javascript type.
 * 
 * @param {string} cell 
 * @returns {} The cell as the appropriate js type.
 */
function parseCellValue(cell) {
    cell = cell.trim();

    // Is empty or 'null' => null
    if (cell.length <= 0 || cell.toLowerCase() === "null") {
        return null;
    }

    // Start and ends with " ('"xxxx"') => string
    if (cell.startsWith("\"") && cell.endsWith("\"")) {
        return cell.slice(1, cell.length - 1);
    }

    // Is boolean true => true
    if (cell.toLowerCase() === "true") {
        return true;
    }

    // Is boolean false => false
    if (cell.toLowerCase() === "false") {
        return false;
    }

    // Only contains numbers and ',' or '.' => Number
    if (isNumberString(cell)) {
        return Number.parseFloat(cell);
    }

    // Not parseable => string
    return cell;
}

/**
 * Returns true if the positive number n is even.
 * False otherwise.
 * 
 * @param {number} n The positive number.
 * @returns {boolean} is n Even?
 */
function isEven(n) {
    return n % 2 === 0;
}

/**
 * This functions checks if a string could be parsed
 * to a number.
 * 
 * @param {string} str The string to test.
 * @returns {boolean} True if the string is a number. 
 */
function isNumberString(str) {
    return str.match(/^[0-9,.]+$/) && str.match(/^[0-9]+$/);
}

module.exports = { parse };