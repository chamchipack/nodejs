const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const infoSchema = new mongoose.Schema({
        memberId: {
            type: String,
        },
        createdAt: {
            type: String
        },
        properties: {
            type: Object,
            classTime: {
                type: Array // [{ day: 'Mon', time: '19' }]
            },
            position: {
                type: String // enums
            },
            timePerWeek: {
                type: String
            },
            
            
        }
})

module.exports = mongoose.model('infos', infoSchema)