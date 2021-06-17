const {Schema, model, Types} = require('mongoose')


const User = new Schema({
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true}
})

module.exports = model('User', User)