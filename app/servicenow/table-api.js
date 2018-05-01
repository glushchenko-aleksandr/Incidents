var http = require('./http.js');

var query = function (config, success) {    
    let params = [];
    params.push('sysparm_display_value=' + config.display_value);
    params.push('sysparm_fields=' + encodeURIComponent(config.fields.join(',')));
    if (config.conditions.length) {
        let queryParam = config.conditions
            .filter(function (condition) { return condition.value })
            .map(function (condition) { return condition.field + '=' + condition.value })
            .join('^');
        if (queryParam.length) {
            params.push('sysparm_query=' + encodeURIComponent(queryParam));
        }
    }
    return http.get('/api/now/table/' + config.table_name + '?' + params.join('&'), success);
};

var get = function (config, success) {    
    let params = [];
    params.push('sysparm_display_value=' + config.display_value);
    params.push('sysparm_fields=' + encodeURIComponent(config.fields.join(',')));
    return http.get('/api/now/table/' + config.table_name + '/' + config.sys_id + '?' + params.join('&'), success);
};

module.exports = {
    query: query,
    get: get
};