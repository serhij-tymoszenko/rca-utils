export function getFile() {
    return document
        .getElementById('svg-input')
        .files[0];
}

export function readFile(file) {
    return new Promise((resolve, _) => {
        const reader = new FileReader();

        reader.onload = () => {
            const content = reader.result.split('\n');
            resolve(content);
        };

        reader.readAsText(file);
    });
}

export function saveFile(svgContent, fileName) {
    const blob = new Blob([svgContent], {type: 'image/svg+xml'});

    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName || "magic";
    a.click();

    URL.revokeObjectURL(url);
}
