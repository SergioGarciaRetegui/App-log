const Database = require('./database');
const Log = require('../models/Log');


class Logger {

    static _log(level, message) {

        return new Promise((resolve, reject) => {
            Database.connect().then(
                () => {
                    Log.create({ level, message }, function (err) {
                        if (err) {
                            console.log(err);
                            reject();
                        }
                        else {
                            console.log('Log created');
                            resolve();
                        }
                    });
                },
                (err) => {
                    console.log(err);
                    reject();
                })
        });
    }

    static _getLog(startDate, endDate, level, message, limit) {
        return new Promise((resolve, reject) => {
            Database.connect().then(
                () => {
                    console.log("_getLog");
                    let _subQuery = {};
                    let _timeQuery = {};
                    let query;
                    if ((startDate) && (!endDate)) {
                        _timeQuery.$gt = startDate;
                        _subQuery.timestamp = _timeQuery;
                    }

                    if ((!startDate) && (endDate)) {
                        _timeQuery.$lt = endDate;
                        _subQuery.timestamp = _timeQuery;
                    }

                    if ((startDate) && (endDate)) {
                        _timeQuery.$gt = startDate;
                        _timeQuery.$lt = endDate;
                        _subQuery.timestamp = _timeQuery;
                    }
                    if (level) {
                        _subQuery.level = level;
                    }
                    if (message) {
                        const _message = { "$regex": message, "$options": "i" };// expresion regular para consultas de cadenas
                        _subQuery.message = _message;                           //opcion "i" hace que la consulta no sea sensible a mayusculas y minusculas
                    }

                    if (limit) {
                        query = Log.find(_subQuery).limit(parseInt(limit));
                    } else {
                        query = Log.find(_subQuery)
                    }

                    query.exec(function(err, logs) {
                        if (err)
                            return console.log(err);
                        logs.forEach(function(log) {
                            console.log(log);
                        });
                    });

                },
                (err) => {
                    console.log(err);
                    reject();
                }
            )
        });
    }

    static info(message) {
        return this._log('INFO', message);
    }


    static debug(message) {
        return this._log('DEBUG', message);
    }


    static error(message) {
        return this._log('ERROR', message);
    }


    static search(startDate, endDate, level, message, limit) {
      console.log("search 2"+level);
        return this._getLog(startDate, endDate, level, message, limit);
    }

}

module.exports = Logger;
