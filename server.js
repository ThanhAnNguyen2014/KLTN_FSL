var express = require('express'),
    configure = require('./server/configure'),
    config = require('./server/config'),
    router = express.Router(),
    mongoose = require('mongoose'); // module communication to database

var routes = require('./server/routes');

var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');

//configure connect to mongo database
mongoose.Promise = global.Promise;
/*mongoose.connect('mongodb://thanhannguyen:Thanhan200114050@ds143211.mlab.com:43211/fsl_io', {
    server: { reconnectTries:true }
});*/
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

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app);

var server = app.listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));

});

