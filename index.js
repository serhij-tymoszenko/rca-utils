import {correct, postCssCorrect} from './utils/svg_corrector.js';
import {addCss} from "./utils/svg_css.js";
import {getFile, readFile, saveFile} from "./utils/io.js"

window.onload = () => {
    document
        .getElementById("convert")
        .addEventListener("click", convert);
    document
        .getElementById("convert-and-add-png")
        .addEventListener("click", convertAndAddPng)
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

async function convertAndAddPng() {
    const {width, height} = dimensions;
    container.querySelector('#placeholder-delete')?.remove();
    let svgElement = container.querySelector('svg');
    if (!svgElement) {
        svgElement = document.createElement('svg');
        svgElement.setAttribute('viewbox', `0 0 ${width} ${height}`);
        svgElement.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    }
    const imgElement = container.querySelector('img');
    if (imgElement) {
        const imageEl = document.createElement('image');
        imageEl.setAttributeNS('http://www.w3.org/1999/xlink','href', imgElement.src);
        imageEl.setAttribute('width', `${width}px`);
        imageEl.setAttribute('height', `${height}px`);
        imageEl.setAttribute('x', 0);
        imageEl.setAttribute('y', 0);
        svgElement.appendChild(imageEl);
    }

    let lines = svgElement.outerHTML.split("\n")
    lines = correct(lines);
    lines = addCss(lines);

    let svgContent = lines.join('\n')
    svgContent = postCssCorrect(svgContent)

    saveFile(svgContent, `combined-css-${document.getElementById('svg-input').files?.[0]?.name}`);
}