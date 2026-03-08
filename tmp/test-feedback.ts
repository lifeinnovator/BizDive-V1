
import { getStageInfo } from '../src/data/feedback';
import * as fs from 'fs';

let output = "";
function log(msg) {
    output += msg + "\n";
}

function runTest(name, score, dimensions) {
    const info = getStageInfo(score, dimensions);
    log(`=== ${name} ===`);
    log(`Score: ${score}`);
    log(`Stage: ${info.stageName}`);
    log(`Diagnosis: ${info.diagnosis}`);
    log(`Suggestion: ${info.suggestion}`);
    log('-------------------\n');
}

runTest("Case 1: Low Overall, High Execution", 35, { D1: 10, D2: 10, D3: 10, D4: 90, D5: 10, D6: 10, D7: 10 });
runTest("Case 2: Mid Overall, Low Growth", 55, { D1: 60, D2: 60, D3: 60, D4: 60, D5: 60, D6: 60, D7: 15 });
runTest("Case 3: High Overall, Balanced", 90, { D1: 90, D2: 90, D3: 90, D4: 90, D5: 90, D6: 90, D7: 90 });

fs.writeFileSync('tmp/test-output.txt', output);
console.log("Output saved to tmp/test-output.txt");
