const path = require('path');

module.exports = {
    output: {
        globalObject: 'this'
    },
    resolve: {
        root: [path.resolve('./src')],
    },
}