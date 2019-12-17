const Logger = require('./helpers/logger');

// Initialize params
let startDate = null;
let endDate = null;
let level = null;
let message = null;
let limit = 10;

process.argv.forEach(function (val, index, array) {
    if (val.indexOf('--startDate=') === 0)
        startDate = val.substr(12).trim();
    else if (val.indexOf('--endDate=') === 0)
        endDate = val.substr(10).trim();
    else if (val.indexOf('--level=') === 0)
        level = val.substr(8).trim().toUpperCase();
    else if (val.indexOf('--message=') === 0)
        message = val.substr(10).trim();
    else if (val.indexOf('--limit=') === 0)
        limit = val.substr(8).trim();
});


// Validation: Check if level is correct
if (level && (['INFO', 'DEBUG', 'ERROR'].indexOf(level.toUpperCase()) < 0)) {
    console.log('Level should be INFO, DEBUG or ERROR');
    process.exit();
}


Logger.search(startDate, endDate, level, message, limit).then((data) => {
        console.log(".search");
        process.exit();
    });
