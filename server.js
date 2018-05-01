var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();

var incidentApi = require('./app/incident-api.js');

app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/api/incidents/query', incidentApi.query);
app.get('/api/incidents/groupByState', incidentApi.groupByState);
app.get('/api/incidents/groupByOpenedAt', incidentApi.groupByOpenedAt);
app.get('/api/incidents/get/:sys_id', incidentApi.get);
app.post('/api/incidents/resolve/:sys_id', incidentApi.resolve);

app.listen(8000);