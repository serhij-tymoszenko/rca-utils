import { rgbToHex } from './color_code_converter.js';

function defineClasses(lines) {
    const classes = {};
    let clsIndex = 0;

    lines = lines.map(line => {
        if (line.includes('style="')) {
            const styleRegex = /style="([^"]+)"/;
            const match = line.match(styleRegex);

            if (match) {
                let style = match[1];
                style = style.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, (match, r, g, b) => {
                    return rgbToHex(parseInt(r), parseInt(g), parseInt(b));
                });

                if (!Object.values(classes).includes(style)) {
                    classes[clsIndex++] = style;
                }
                const clsId = Object.keys(classes).find(key => classes[key] === style);
                return line.replace('style="' + match[1] + '"', `class="cls-${clsId}"`);
            }
        }
        return line;
    });
    return [lines, classes]
}

function insertClasses(lines, classes) {
    let index = lines.findIndex(line => /<svg[^>]*>/.test(line));
    lines.splice(index + 1, 0, '<defs>', '<style>', '</style>', '</defs>');

    Object.entries(classes).forEach(([k, v]) => {
        let cssRule = `.cls-${k} { ${v} }`;
        if (!cssRule.endsWith("; }")) {
            cssRule = cssRule.replace(" }", "; }")
        }
        lines.splice(index + 3, 0, cssRule);
    });

    return lines
}

export function addCss(lines) {
    const [newLines, classes] = defineClasses(lines);
    return insertClasses(newLines, classes);
}