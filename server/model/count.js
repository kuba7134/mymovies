const { default: mongoose } = require("mongoose")

const countSchema = new mongoose.Schema({
    count: { type: "number" },
})

const model = mongoose.model('apiCount', countSchema)

module.exports = model