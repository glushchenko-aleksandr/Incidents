var https = require('https');
var config = require('../../config.js');

var createHeaders = function () {
    return {
        'Authorization': 'Basic ' + Buffer.from(config.servicenow.username + ':' + config.servicenow.password).toString('base64'),
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    };
};

var get = function (path, success) {
    const options = {
        hostname: config.servicenow.hostname,
        port: config.servicenow.port,
        path: path,
        headers: createHeaders()
    };

    return https.get(options, (resp) => {
        let data = '';

        resp.on('data', (chunk) => {
            data += chunk;
        });

        resp.on('end', () => {
            if (success) {
                success(data);
            }
        });
    })
};

module.exports = {
    get: get
};