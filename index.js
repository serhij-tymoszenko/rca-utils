import {correct, postCssCorrect} from './utils/svg_corrector.js';
import {addCss} from "./utils/svg_css.js";
import {getFile, readFile, saveFile} from "./utils/io.js"

window.onload = () => {
    document
        .getElementById("convert")
        .addEventListener("click", convert);
}

async function convert() {
    const file = getFile()

    let lines = await readFile(file);
    lines = correct(lines);
    lines = addCss(lines);

    let svgContent = lines.join('\n')
    svgContent = postCssCorrect(svgContent)

    saveFile(svgContent, `css-${file.name}`)
}