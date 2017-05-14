var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');

var AdminSchema = new Schema({
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String },
    email: { type: String },
    password: { type: String }
});

AdminSchema.virtual('fullname').get(function () {
    return this.firstname + ' ' + this.lastname;
});

var Admin = module.exports = mongoose.model('Admin', AdminSchema);

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}
module.exports.getAdminByEmail = function (username, callback) {
    // check Input field is username or email
    var query = (username.indexOf('@') === -1) ? {username: username} : {email: username};
   // var query = { email: email };
    Admin.findOne(query, callback);
}
module.exports.getAdminById = function (id, callback) {
    Admin.findById(id, callback);

}