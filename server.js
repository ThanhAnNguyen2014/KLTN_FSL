var express = require('express'),
    config = require('./server/configure'),
    router = express.Router(),
    mongoose = require('mongoose'); // module communication to database

var routes = require('./server/routes');

var app = express();

app.set('port', process.env.PORT || 3300);
app.set('views', __dirname + '/views');
//configure connect to mongo database
mongoose.connect('mongodb://localhost:27017/FSL_IO');
mongoose.connection.on('open', function () {
    console.log('Mongoose connected!');
});



app = config(app);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

routes(app);

var server = app.listen(app.get('port'), function () {
    console.log('Server up: http://localhost:' + app.get('port'));

});

