'use strict';

const converter = require('@md-to-latex/converter');
const diagnose = require('@md-to-latex/converter/dist/diagnose');
const latexPrinter = require('@md-to-latex/converter/dist/printer/latex');
const path = require('path');

/**
 *
 * @param filepath{string}
 * @private
 * @return {converter.DiagnoseList}
 */
function __getFileDiagnosticList(filepath) {
    const originalFilepath = path.resolve(filepath);
    const rootDir = path.resolve('.');

    /** @type converter.DiagnoseList */
    const diagnostic = converter.convertMarkdownFiles(rootDir, true);
    return diagnostic.filter(
        d => path.resolve(d.filePath) === originalFilepath,
    );
}

/** @type Record<diagnose.DiagnoseSeverity, Linter.Severity> */
const __severityMapping = {
    ['FATAL']: 2,
    ['ERROR']: 2,
    ['WARNING']: 1,
    ['INFO']: 0,
};

/** @type ProcessorFunction */
function __processor(filepath) {
    return __getFileDiagnosticList(filepath).map(d => ({
        line: d.pos.start.line,
        column: d.pos.start.column,
        endLine: d.pos.end.line,
        endColumn: d.pos.end.column,
        message: d.message,
        severity: __severityMapping[d.severity],
        ruleId: 'MD' + d.errorType,
        fatal: d.severity === 'FATAL',
    }));
}

module.exports = __processor;
