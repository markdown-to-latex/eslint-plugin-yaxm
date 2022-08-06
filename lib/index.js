'use strict';

const processor = require('./processor');

module.exports.processors = {
    /** @type require("@types/eslint").Linter.Processor */
    ".yaxm": {
        preprocess: function () {
            return [];
        },
        postprocess: function (messages, filename) {
            messages = [].concat(...messages);
            messages.push(...processor(filename));

            return messages;
        },
    },
};
