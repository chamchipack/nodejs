const express = require('express')
const Members = require('../schema/members')
const Payments = require('../schema/payments')
const Infomations = require('../schema/infomation')
const router = express.Router()
const moment = require('moment')



router.post('/members', async (req, res) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
    try {
        let { properties } = req.body

        const withoutPayment = Object.entries(properties).reduce((acc, [key, value]) => {
            if ('paymentDate' !== key) acc.push({ [key]: value})
            return acc
        }, [])

        const memberResult = Object.assign(...withoutPayment)
        const paymentDate = { paymentDate: properties['paymentDate']}

        
        let result = await Members.create({ 'properties': memberResult, 'createdAt': currentTime  })

        res.status(201).json({ result })
        const { _id: memberId } = result

        let payResult = await Payments.create({ memberId, 'properties': { ...paymentDate }, 'createdAt': currentTime})

        // await Infomations.create({ memberId, 'properties': {}, 'createdAt': currentTime})

        
    } catch(e) {
        console.log('member Post Error', e)
        res.status(400).send('member post error')
    }
})

router.get('/members', async (req, res) => {
    try {
        const result = await Members.find()
        res.status(200).json({ result })
    } catch(e) {
        console.log('member get error', e)
        res.status(400).send('member get error')
    }
})

router.put('/members', async (req, res) => {
    try {
        const { body: { properties } } = req

        const withoutPayment = Object.entries(properties).reduce((acc, [key, value]) => {
            if ('paymentDate' !== key) acc.push({ [key]: value})
            return acc
        }, [])

        const memberResult = Object.assign(...withoutPayment)
        const paymentDate = { paymentDate: properties['paymentDate']}

        const result = await Members.update({ 'properties': memberResult })
        res.status(200).json({ result })

        await Payments.update({ 'properties': { ...paymentDate }})
    } catch(e) {
        console.log('member put error')
        res.status(400).send('member put error')
    }
})

router.delete('/members', async (req, res) => {
    try {
        const { query: { _id } = {} } = req
        const result = await Members.deleteOne({ _id })
        res.status(200).json({ result })
    } catch(e) {
        res.status(400).send('member delete failed')
    }
})

module.exports = router