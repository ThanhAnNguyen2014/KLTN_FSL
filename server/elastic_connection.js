var elasticsearch = require('elasticsearch');
var config= require('../server/config');
// var client = new elasticsearch.Client({
//     host: config.elasticsearch.bonsaiHostEndpoint,
//     log: 'info'
// });

// // Test the connection:
// // Send a HEAD request to "/" and allow
// // up to 30 seconds for it to complete.
// client.ping({
//     requestTimeout: 2000,
// }, function (error) {
//     if (error) {
//         console.error('Elasticsearch cluster is down!.....');
//     } else {
//         console.log('ElasticSearch cluster connected successfully');
//     }
// });

var client = new elasticsearch.Client( {  
  hosts: 
    // 'https://elastic:tvheBwfuQnPekFClugkw50D4@5f40ab42130d8ebe15f6f2d120897b9b.ap-northeast-1.aws.found.io:9243/'
    'https://elastic:1UKvOzRPAq9erhT4egck4rka@0d59ffeb5141ece59056ed6a6daa4ddf.ap-northeast-1.aws.found.io:9243/'
});
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