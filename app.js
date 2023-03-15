const express = require('express')
const connect = require('./schema/index')
const app = require('express')()
const morgan = require('morgan')

// const jwt = require('jsonwebtoken');

// const payload = {
//   username: 'john',
//   isAdmin: true
// };

// const secretKey = 'my-secret-key';

// const token = jwt.sign(payload, secretKey, { expiresIn: '1h' });

// console.log(token);

// try {
//   const decoded = jwt.verify(token, secretKey);
//   console.log(decoded);
// } catch(err) {
//   console.error(err);
// }


// mongodb
connect()

// router call
const MembersRouter = require('./routes/members')
const PaymentsRouter = require('./routes/payments')
const InfoRouter = require('./routes/information')
const CollectionRouter = require('./routes/collection')


// middleware
app.use(express.json())
app.use(express.urlencoded())
app.use(express.urlencoded({ extended: false }))
app.use(morgan('combined'))

// router connect
app.use('/api', [MembersRouter, PaymentsRouter, InfoRouter, CollectionRouter])

app.get('/', (req, res) => {
    res.send('anything')
})

app.listen(3000, (req, res) => {
    console.log("3000 server on")
})