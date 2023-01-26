import * as core from '@actions/core';
import eslintJsonReportToJsObject from './eslintReportJsonToObject';
import inputs from './inputs';
import { getPullRequestChangedAnalyzedReport } from './analyzedReport';
import { createStatusCheck, onCheckRateLimitingError } from './checksApi';
(async () => {
  try {
    /**
     * Eslint report to javascript object conversion
     */
    const parsedEslintReportJs = eslintJsonReportToJsObject(inputs?.eslintReportFile);
        console.log('parsedEslintReportJs:    ', parsedEslintReportJs);

    const { checkId } = await createStatusCheck();
    console.log('checkId     :', checkId);

    const report = await getPullRequestChangedAnalyzedReport(parsedEslintReportJs);
    console.log('report:    ', report);
    const conclusion = report?.success ? 'success' : 'failure';
    await onCheckRateLimitingError(checkId, conclusion, report, 'completed');
    
  } catch (e) {
    const error = e as Error;
    console.log('personal error: ', error.toString());
    core.setFailed(error.message);
  }
})();
