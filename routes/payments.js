const express = require('express')
const Payments = require('../schema/payments')
const router = express.Router()
const moment = require('moment')




router.get('/payments', async (req, res) => {
    try {
        const result = await Payments.find()
        res.status(200).json({ result })
    } catch(e) {
        console.log('payments get error', e)
        res.status(400).send('payments get error')
    }
})


module.exports = router