var path = require('path'),
    routes = require('./routes'),
    exphbs = require('express-handlebars'),
    express = require('express'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    morgan = require('morgan'),
    multer = require('multer'),
    methodOverride = require('method-override'),
    errorHandler = require('errorhandler'),
    moment = require('moment'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    session = require('express-session'),
    passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;



module.exports = function (app) {
    app.engine('handlebars', exphbs.create({
        defaultLayout: 'userlayout',
        layoutsDir: app.get('views') + '/layouts',
        partialsDir: [app.get('views') + '/partials'],
        helpers: {
            // timeago: function (timestamp) {
            //     //console.log(timestamp);
            //     return moment(timestamp).startOf('minute').fromNow();
            // }
            section: function (name, options) {
                if (!this._sections) this._sections = {};
                this._sections[name] = options.fn(this);
                return null;
            },
            timeago: function (timestamp) {
                return moment(timestamp).startOf('minute').fromNow();
            }
        }
    }).engine);
    app.set('view engine', 'handlebars');



    app.use(morgan('dev'));

    // BodyParser Middleware
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser('secret'));

    // express session
    app.use(session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    }));
    //  Connect flash
    app.use(flash());//4


    app.use(multer({ dest: path.join(__dirname, 'public/upload/temp') }));

    app.use(methodOverride());


    //Set static Folder
    app.use(['/public/', '/admin/public/', 'test/'], express.static(path.join(__dirname, '../public')));

    // Passpor init 
    app.use(passport.initialize());
    app.use(passport.session());

    //require('./passport')(passport);

    // Express validator 
    app.use(expressValidator({
        errorFormatter: function (param, msg, value) {
            var namespace = param.split('.'),
                root = namespace.shift(),
                formParam = root;

            while (namespace.length) {
                formParam += '[' + namespace.shift() + ']';

            }
            return {
                param: formParam,
                msg: msg,
                value: value
            };
        }
    }));

    app.use(function (req, res, callback) {
        res.locals.success_msg = req.flash('success_msg');
        res.locals.error_msg = req.flash('error_msg');
        res.locals.error = req.flash('error');
        res.locals.user = req.user || null;
        callback();
    });




    if ('development' === app.get('env')) {
        app.use(errorHandler());
    }
    return app;
};