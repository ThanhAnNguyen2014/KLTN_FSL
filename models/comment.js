var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var CommentSchema = new Schema({
    id_user: { type: ObjectId, ref:'User' }, // linking to id of User table
    id_house: { type: ObjectId }, // linking to id of House table
    comment: { type: String }, // content comment
    timestamp: { type: Date, 'default': Date.now },
});
// property get/ set
CommentSchema.virtual('house')
    .set(function (house) {
        this._house = house;
    })
    .get(function () {
        return this._house;
    });
var Comment = module.exports = mongoose.model('Comment', CommentSchema);