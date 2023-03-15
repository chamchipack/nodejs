const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const collectionSchema = new mongoose.Schema({
    createdAt: {
        type: String
    },
    items: {
        type: Array,
    }
})

module.exports = mongoose.model('Collections', collectionSchema)