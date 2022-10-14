const { default: mongoose } = require("mongoose")

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    movies: Array
}, { collection: 'users'})

const model = mongoose.model('User', UserSchema)

module.exports = model