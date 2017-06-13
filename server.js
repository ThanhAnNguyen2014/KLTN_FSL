var express = require('express'),
    configure = require('./server/configure'),
    config = require('./server/config'),
    router = express.Router(),
    cors=require('cors'),
    mongoose = require('mongoose'); // module communication to database

var routes = require('./server/routes');

var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');

//configure connect to mongo database
mongoose.Promise = global.Promise;

mongoose.connect(config.database_mLab);
// On Connection
mongoose.connection.on('connected', () => {
    console.log('Connected to database ' + config.database_local);
});
mongoose.connection.on('open', function () {
    console.log('Mongoose connected!');
});
// On Error
mongoose.connection.on('error', (err) => {
    console.log('Database error: ' + err);
});




app = configure(app);
app.use(cors());

routes(app);

var server = app.listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));

});

