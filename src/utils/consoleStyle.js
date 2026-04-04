const { styleText } = require('node:util');

function colorize(color, text) {
    if (typeof styleText === 'function') {
        return styleText(color, text);
    }

    return text;
}

module.exports = { colorize };
