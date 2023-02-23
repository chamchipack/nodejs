const mongoose = require('mongoose')
const autoIncrement = require('mongoose-auto-increment')
const membersSchema = new mongoose.Schema({
        createdAt: {
            type: String,
        },
        properties: {
            type: Object,
            name: {
                type: String
            },
            mobile: {
                type: String,
            },
            gender: {
                type: String // enums
            },
            age: {
                type: String
            },
            address: {
                type: String // enums
            },
            job: {
                type: String,
            },
            route: {
                type: String,
            },
            status: {
                type: Boolean
            },
            payment: {
                type: String
            },
            paymentDate: {
                type: String
            },
            classTime: {
                type: Array // [{ day: 'Mon', time: '19' }]
            },
            position: {
                type: String // enums
            },
            timePerWeek: {
                type: String
            },
            

            // paymentDate: {
            //     type: String
            // },
            // createdAt: {
            //     type: String
            // }


            // classTime: {
            //     type: Array // [{ day: 'Mon', time: '19' }]
            // },
            // position: {
            //     type: String // enums
            // },
            // timePerWeek: {
            //     type: String
            // },
            
        }
})

// membersSchema.plugin(autoIncrement.plugin, {
//     model: 'Members',
//     field: 'name',
//     startAt: 1,
//     increment: 1,
// })

module.exports = mongoose.model('Members', membersSchema)