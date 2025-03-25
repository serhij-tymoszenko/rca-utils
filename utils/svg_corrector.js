function initialCorrect(lines) {
    return lines
        .map(line => line.replace(/<svg[^>]*>/g, '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 380 600">'))
        .filter(line => !line.includes("<!DOCTYPE"));
}

function inkscapeCorrect(lines) {
    return lines
        .join('')
        .replaceAll(">", ">`")
        .replaceAll(/<metadata[\s\S]*?<\/metadata>/gi, '')
        .replaceAll(/<sodipodi:namedview[\s\S]*?<\/sodipodi:namedview>/gi, '')
        .replaceAll(/inkscape:\w+="[^"]*"/g, "")
        .split("`")
        .filter(line => !/<defs[^>]*\/>/.test(line));
}

function removeEmptyLinesAndExtraSpaces(lines) {
    return lines
        .map(line => line.replace(/<!--[\s\S]*?-->/g, "").trim())
        .filter(item => item !== "");
}

export function correct(lines) {
    lines = inkscapeCorrect(lines)
    lines = initialCorrect(lines)
    lines = removeEmptyLinesAndExtraSpaces(lines)
    return lines;
}

export function postCssCorrect(svgContent) {
    return svgContent
        .replace('#0000ff', 'blue')
        .replace(/ +/g, ' ')
        .trim()
}