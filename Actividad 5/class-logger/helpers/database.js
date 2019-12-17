const mongoose = require('mongoose');
const config = require('../config');


class Database {

    static connect() {
        return new Promise((resolve, reject) => {
            mongoose.connect(`mongodb://${config.DB_HOST}/${config.DB_NAME}`, {useNewUrlParser: true});

            var db = mongoose.connection;
            db.on('error', function() {
                console.error.bind(console, 'connection error:');
                reject();
            });
            db.once('open', function() {
                resolve();
            });
        });
    }
}    


module.exports = Database;