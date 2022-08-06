import { Linter } from 'eslint';

export type ProcessorFunction = (filename: string) => Linter.LintMessage;

const __processor: ProcessorFunction;

export default __processor;
