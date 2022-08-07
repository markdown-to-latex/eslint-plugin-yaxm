'use strict';

const converter = require('@md-to-latex/converter');
const path = require('path');
const yaml = require('js-yaml');
const fs = require('fs');

/**
 *
 * @param filepath{string}
 * @private
 * @return {converter.DiagnoseList}
 */
function __getFileDiagnosticList(filepath) {
    const originalFilepath = path.resolve(filepath);
    const rootDir = path.resolve('.');

    const buildConfig = yaml.load(fs.readFileSync('yaxm-build.yml', 'utf-8'));
    const result = converter.convertYaxmFiles({
        rootDir: rootDir,
        buildConfig: buildConfig,
    });

    /** @type converter.DiagnoseList */
    const diagnostic = result.diagnostic;

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
