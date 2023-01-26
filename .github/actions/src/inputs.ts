import * as core from '@actions/core';

/**
 * Github action inputs
 */
const checkName = core?.getInput('check-name', { required: false });
const eslintReportFile = core?.getInput('eslint-report-json', { required: true });

export default {
  checkName,
  eslintReportFile,
};
