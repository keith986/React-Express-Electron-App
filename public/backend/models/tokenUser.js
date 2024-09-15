const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenUser = new Schema({
userid: {
    type: String,
}
}, {timestamps: true});

const tokens = mongoose.model('tokens', tokenUser);
module.exports = tokens;


