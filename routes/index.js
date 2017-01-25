/**
 * Created by mgabilhe on 1/23/17.
 */

var fs = require('fs');

module.exports = function (app) {
    fs.readdirSync(__dirname).forEach(function (file) {
        if (file == "index.js") {
            return;
        }
        var name = file.substr(0, file.indexOf('.'));
        require('./' + name + '.js')(app);
    });
};