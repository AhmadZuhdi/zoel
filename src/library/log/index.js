import configLog from 'configs/log';
import fs from 'fs-extra-promise';
import moment from 'moment';

const DEBUG = configLog.debug;

function writeLogToFile(...args) {
  fs.ensureFileAsync(configLog.logPath)
  .then(() => fs.appendFileAsync(configLog.logPath, `[${moment().format()}] ${args.join(' ')}
`));
}

function log(...args) {
  if (DEBUG) { console.log(...args); }
  if (configLog.saveToFile) { writeLogToFile(...args); }
}

log.error = function (...args) {
  if (DEBUG) { console.error(...args); }
  if (configLog.saveToFile) { writeLogToFile(...args); }
}

export default log;
