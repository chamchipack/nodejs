const express = require('express')
const Members = require('../schema/members')
const Payments = require('../schema/payments')
const Informations = require('../schema/information')
const router = express.Router()
const schemaKeys = require('../store/status')
const moment = require('moment')

const exceptions = ['classTime', 'position', 'timePerWeek', 'paymentDate', 'payment']

router.post('/members', async (req, res) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
    try {
        let { properties } = req.body
        const exceptionArray = []

        const withoutPayment = Object.entries(properties).reduce((acc, [key, value]) => {
            if (!exceptions.includes(key)) acc.push({ [key]: value})
            else exceptionArray.push({ [key]: value })
            return acc
        }, [])

        const memberResult = Object.assign(...withoutPayment)
        const exception = Object.assign(...exceptionArray)
        const paymentDate = { paymentDate: exception['paymentDate']}
        const payment = { payment: exception['payment']}

        
        let result = await Members.create({ 'properties': memberResult, 'createdAt': currentTime })

        res.status(201).json({ result })
        const { _id: memberId } = result
        let payResult = await Payments.create({ memberId, 'properties': { ...paymentDate, ...payment }, 'createdAt': currentTime})

        const classTime = { classTime: exception['classTime']}
        const position = { position: exception['position']}
        const timePerWeek = { timePerWeek: exception['timePerWeek']}

        await Informations.create({ memberId, 'properties': { ...classTime, ...position, ...timePerWeek }, 'createdAt': currentTime})

        
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

        const exceptionArray = []

        const withoutPayment = Object.entries(properties).reduce((acc, [key, value]) => {
            if (!exceptions.includes(key)) acc.push({ [key]: value})
            else exceptionArray.push({ [key]: value })
            return acc
        }, [])

        const memberResult = Object.assign(...withoutPayment)
        const exception = Object.assign(...exceptionArray)
        const paymentDate = { paymentDate: exception['paymentDate']}

        const result = await Members.update({ 'properties': memberResult })
        res.status(200).json({ result })

        const classTime = { classTime: exception['classTime']}
        const position = { position: exception['position']}
        const timePerWeek = { timePerWeek: exception['timePerWeek']}

        await Payments.update({ 'properties': { ...paymentDate }})

        await Infomations.update({ 'properties': { ...classTime, ...position, ...timePerWeek }})
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