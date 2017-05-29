var jwt = require('jsonwebtoken');
var config = require('../server/config');

module.exports = function (req, res, callback) {
    if (req.headers && req.headers.authorization && req.headers.authorizition.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], config.secret, function (err, decoded) {
            if (err) req.user = undefined;
            req.user = decoded;
            callback();
        });
    } else {
        req.user = undefined;
        callback();
    }

}