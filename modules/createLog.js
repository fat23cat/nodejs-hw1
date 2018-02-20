const fs = require('fs');

function createLog(data, type) {
    fs.writeFileSync("stats.txt", "", {encoding: 'utf-8'});
    data.split('\n').forEach((item, i) => {
        let newString = item;
    if (item.indexOf(type) > -1) {
        let arr = item.split(': ');
        arr[1] = +arr[1] + 1;
        newString = arr.join(': ');
    }
    if (i != 3) {
        newString += '\r\n';
    }
    fs.appendFileSync("stats.txt", newString, {encoding: 'utf-8'});
  });
}

module.exports = createLog;
