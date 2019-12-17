const Logger = require('./helpers/logger');

// Initialize params
let level = null;
let message = null;

process.argv.forEach(function (val, index, array) {
    if (val.indexOf('--level=') === 0)
        level = val.substr(8).trim().toUpperCase();
    else if (val.indexOf('--message=') === 0)
        message = val.substr(10).trim();
});

console.log('level:[' + level + ']');
console.log('message:[' + message + ']');

// Validation: check if `level` param exists
if (!level) {
    console.log('The `level` param is required')
    process.exit();
}

// Validation: check if `message` param exists
if (!message) {
    console.log('The `message` param is required');
    process.exit();
}

// Validation: Check if level is correct
if (['INFO', 'DEBUG', 'ERROR'].indexOf(level) < 0) {
    console.log('Level should be INFO, DEBUG or ERROR');
    process.exit();
}

// Log message
switch (level) {
    case 'INFO':
        Logger.info(message).then(
                () => process.exit(),
                () => process.exit());
        break;

    case 'DEBUG':
        Logger.debug(message).then(
                () => process.exit(),
                () => process.exit());
        break; 
        
    case 'ERROR':
        Logger.error(message).then(
                () => process.exit(),
                () => process.exit());
        break;        
}
