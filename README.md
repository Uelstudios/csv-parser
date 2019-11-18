# Javascript CSV Parser
Parse csv content with a small module that requires no additional dependencies.

## How to use
Install with 
`
npm install @uelstudios/csv-parser
`

In your code

```
const csvParser = require("@uelstudios/csv-parser");
const rows = csvParser.parse(<CSV DATA>);

// Row: 2 (thrid row)<br/>
// Column: 3 (fourth column)<br/>
console.log(rows[2][3]);
```

## Example
```
// Read file and print to console\
const fs = require("fs");\
const csvParser = require("@uelstudios/csv-parser");

// Read file\
const content = fs.readFileSync("path/to/file.csv", { encoding: "utf-8" });

// Parse and log\
const rows = csvParser.parse(content);\
rows.forEach(row => logRow(row));

// Function to print row\
function logRow(row) {
    console.log(row.join("\t\t"));
}
```

## Supported Types
- string
- number
- boolean

## Known Issues
- The parse may not detect if the number of columns is constant.
- The parser may not check for equal cell types across rows.
- The parser may not check for a header.

## Author
Paul von Allwörden

### License
```
Version 2, December 2004

Copyright (C) 2004 Sam Hocevar
14 rue de Plaisance, 75014 Paris, France
Everyone is permitted to copy and distribute verbatim or modified copies of this license document, and changing it is allowed as long as the name is changed.

DO WHAT THE FUCK YOU WANT TO PUBLIC LICENSE
TERMS AND CONDITIONS FOR COPYING, DISTRIBUTION AND MODIFICATION

1. You just DO WHAT THE FUCK YOU WANT TO.
```
