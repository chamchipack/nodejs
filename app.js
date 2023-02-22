const express = require('express')
const connect = require('./schema/index')
const app = require('express')()

// mongodb
connect()

// router call
const MembersRouter = require('./routes/members')
const PaymentsRouter = require('./routes/payments')
const InfoRouter = require('./routes/information')


// middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(express.urlencoded({ extended: false }))

// router connect
app.use('/api', [MembersRouter, PaymentsRouter, InfoRouter])

app.get('/', (req, res) => {
    res.send('anything')
})

app.listen(3000, (req, res) => {
    console.log("3000 server on")
})