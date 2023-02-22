const express = require('express')
const Infomations = require('../schema/infomation')
const router = express.Router()
const moment = require('moment')

router.get('/infos', async (req, res) => {
    try {
        const result = await Infomations.find()
        res.status(200).json({ result })
    } catch(e) {
        console.log('infos get error', e)
        res.status(400).send('infos get error')
    }
})


module.exports = router