var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId,
    bcrypt = require('bcryptjs');

var UserSchema = new Schema({
    firstname: { type: String }, // name of user
    lastname: { type: String },
    username: { type: String, index: true }, // username of user
    email: { type: String },// email of user
    password: { type: String }, // passworld of user 
    address: { type: String }, // address of userx
    phone: { type: String }, // phone number of user
    gender: { type: Boolean }, // gender of user (male of female)
    identitycard: { type: String },
    birthday: { type: Date }, // brithday of user
    image: { type: String },//image of user
    id_facebook: { type: String }, // id account facebook of user if user login with facebook
    id_google: { type: String },
    create_date: { type: Date, 'default': Date.now() }, // create day current of user
    status: { type: Boolean, 'default': true }, // check status of user
    active: {type: Boolean, default: false},
    tokenjwt:{type: String, default: null},
});
var User = module.exports = mongoose.model('User', UserSchema);

module.exports.CreateUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserbyUsername = function (username, callback) {
    var query = { username: username };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);

}
module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}