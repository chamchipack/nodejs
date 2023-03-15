const express = require('express')
const Collections = require('../schema/collection')
const router = express.Router()
const moment = require('moment')

router.post('/collections', async (req, res) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
    try {
        const newData = new Collections({
            createAt: currentTime,
            items: [
                {
                    name: 'devices',
                    createAt: currentTime,
                    schema: [
                        {
                            name: 'device1',
                            gbn: 'cctv'
                        }
                    ]
                },
                {
                    name: 'facilities',
                    createAt: currentTime,
                    schema: [
                        {
                            name: 'facility1',
                            gbn: 'bridge'
                        }
                    ]
                }
            ]
        })
        // const { title, name, gbn } = req.body
        // const final = await Collections.updateMany({}, { $push: { "items.$[outer].schema": {name: 'device4'}}}, {
        //     arrayFilters: [{ "outer.name": "devices"}]
        // })
        await newData.save()

        res.status(201).json({ newData })
    } catch (e) {
        res.status(404).json({ e })
    }
})

router.put('/collections', async (req, res) => {
    const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
    try {
        const { name, gbn, title } = req.body
        const result = await Collections.aggregate([
            {
              $match: {
                "items.name": title
              }
            },
            {
              $project: {
                "items": {
                  $filter: {
                    input: "$items",
                    as: "item",
                    cond: { $eq: ["$$item.name", title] }
                  }
                }
              }
            }
          ]);
          
          if (result.length) {
            const items = result[0].items;
            if (items.length) {
              const schema = items[0].schema;
              schema.push({ name, gbn });
              await Collections.findOneAndUpdate(
                { "items.name": title },
                { $set: { "items.$[i].schema": schema } },
                { arrayFilters: [{ "i.name": title }] }
              );
            }
          }
          
        // const [data] = datas
        // const { schema } = data.items.find(({name}) => name === title)
        // schema.push({ name, gbn})
        // const rs = datas

        // console.log(Object.entries(deviceObj).length)
        // deviceObj.items[0].schema.push({name, gbn});
        // console.log(deviceObj.items[0].schema)

        // const ds = new Collections({datas})

        // const result = await ds.save()
            
        res.status(201).json({ result })
    } catch (e) {
        console.log(e)
        res.status(400).send('collection post error')
    }
})

// router.put('/collections', async (req, res) => {
//     const currentTime = moment().format('YYYY-MM-DD HH:mm:ss')
//     try {
//         const { name, age, gender } = req.body
//         const final = await Collections.updateMany({}, { $push: { items: { age, gender} }})
//             // let result = await Collections.create({ createdAt: currentTime, name: 'John', items: [{age: '20', gender: 'male'}] })
            
//             console.log('성공')
//         res.status(201).json({ final })
//     } catch (e) {
//         console.log(e)
//         res.status(400).send('collection post error')
//     }
// })

// router.get('/collections', async (req, res) => {
//     console.log(req.params)
//     // const test = req.url.split('/')
//     // console.log(test)
//     try {
//         const result = await Collections.find({})
          
//         console.log(result)
//         res.status(200).json({ result })
//     } catch(e) {
//         console.log('Collections get error', e)
//         res.status(400).send('Collections get error')
//     }
// })

router.get('/collections/:collectionName', async (req, res) => {
    console.log(req.params.collectionName)
    const query = req.params.collectionName
    // const test = req.url.split('/')
    // console.log(test)
    try {
        // const result = await Collections.find({})
        const result = await Collections.aggregate([
            { $match: { "items.name": query } }, // 검색 조건
            { $unwind: "$items" }, // 배열 펼치기
            { $match: { "items.name": query } }, // 필터링 조건
            { $group: { _id: "$_id", items: { $push: "$items" } } } // 결과 조합
          ]);
          
        console.log(result)
        res.status(200).json({ result })
    } catch(e) {
        console.log('Collections get error', e)
        res.status(400).send('Collections get error')
    }
})

module.exports = router