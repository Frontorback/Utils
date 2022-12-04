
// Replace spaces for TextArea
export const valueWithTwoLineBreaks = (value) =>
    value
        .replaceAll(/[\r\n][ \t]+/g, '\n')
        .replaceAll(/[ \t]+[\r\n]/g, '\n')
        .replace(/\n{3,}|\n *\n *\n+/g, '\n\n')
        .replace(/ {2,}/gm, ' ')
        .trim();
