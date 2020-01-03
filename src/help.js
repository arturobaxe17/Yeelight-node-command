const fs = require('fs');
exports.printHelp = function (section) {
    const helpPath = './utils/help/txt/help-';
    const extension = '.txt'

    if (section == null) {
        section = 'general';
    }

    let path = helpPath + section + extension;
    var text = fs.readFileSync(path, 'utf8');
    console.log(text);
}