const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    username: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, minlength:6, required: true},
    profilePicture: {type: String, default: ""},
},
 {
    timestamps: true
 }
);


const User = mongoose.model('User', userSchema);
module.exports = User;
