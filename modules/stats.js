const EventEmitter = require('events').EventEmitter;
const fs = require('fs');
const stats = new EventEmitter;
const createLog = require('./createLog')

stats.on("createStats", function (type) {
    fs.readFile("stats.txt", {encoding: 'utf-8'}, (err, data) => {
        if(err) {
            if (err.code == 'ENOENT') {
                console.error(err.message);
            } else {
                console.error(err);
            }
        } else {
            createLog(data, type);
            fs.readFile("stats.txt", {encoding: 'utf-8'}, (err, data) => {console.log(data);});
    }
    });
});

module.exports = stats;
