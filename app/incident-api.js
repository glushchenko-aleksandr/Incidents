var tableApi = require('./servicenow/table-api');
var aggregateApi = require('./servicenow/aggregate-api');

var query = function (req, res) {

    var config = {
        table_name: 'incident',
        display_value: true,
        fields: ['sys_id', 'number', 'urgency', 'caller_id', 'opened_at', 'state'],
        conditions: [{ field: 'urgency', value: req.query.urgency }, { field: 'state', value: req.query.state }]
    };

    tableApi.query(
        config,
        function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(JSON.parse(data)));
        }).on("error", (err) => {
            //TODO
        });

};

var groupByState = function (req, res) {

    var config = {
        table_name: 'incident',
        display_value: true,
        count: true,
        group_by: ['state'],
        conditions: []
    };

    aggregateApi.query(
        config,
        function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(JSON.parse(data)));
        }).on("error", (err) => {
            //TODO
        });

};

var groupByOpenedAt = function (req, res) {

    var config = {
        table_name: 'incident',
        display_value: true,
        fields: ['opened_at'],
        conditions: []
    };

    tableApi.query(
        config,
        function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(JSON.parse(data)));
        }).on("error", (err) => {
            //TODO
        });

};

var get = function (req, res) {
    var config = {
        table_name: 'incident',
        display_value: true,
        fields: ['sys_id', 'number', 'urgency', 'caller_id', 'opened_at', 'state', 'description'],
        sys_id: req.params.sys_id
    };

    tableApi.get(
        config,
        function (data) {
            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(JSON.parse(data)));
        }).on("error", (err) => {
            //TODO
        });
};

var resolve = function (req, res) {
    //TODO
};

module.exports = {
    query: query,
    get: get,
    resolve: resolve,
    groupByState: groupByState,
    groupByOpenedAt: groupByOpenedAt
};