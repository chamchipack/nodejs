const mongoose = require('mongoose')
require('dotenv').config()

const connect = () => {
    mongoose.connect(process.env.db, {
        ignoreUndefined: true
    })
    try {
        console.log('MongoDB Connect')
    } catch(e) {
        console.log(e,'MongoDB UnConnect')
    }
}

mongoose.connection.on('error', (err) => {
    console.err('mongo err', err)
})

module.exports = connect