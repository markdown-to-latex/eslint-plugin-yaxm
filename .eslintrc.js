'use strict';

/** @type require("@types/eslint").Linter.Config */
module.exports = {
    root: true,
    extends: [
        'eslint:recommended',
        'plugin:eslint-plugin/recommended',
        'plugin:node/recommended',
    ],
    env: {
        node: true,
    },
};
