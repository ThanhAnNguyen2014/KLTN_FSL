var elasticsearch = require('elasticsearch');
var config= require('../server/config');
var client = new elasticsearch.Client({
    host: config.elasticsearch.bonsaiHostEndpoint,
    log: 'info'
});

// Test the connection:
// Send a HEAD request to "/" and allow
// up to 30 seconds for it to complete.
client.ping({
    requestTimeout: 2000,
}, function (error) {
    if (error) {
        console.error('Elasticsearch cluster is down!.....');
    } else {
        console.log('ElasticSearch cluster connected successfully');
    }
});

module.exports = client;