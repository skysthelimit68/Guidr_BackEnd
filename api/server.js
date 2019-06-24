const express = require('express')
const helmet = require('helmet')
const cors = require('cors')

const server = express();

const usersAuthRoute = require('../routes/usersAuth.js')
const tripsRoute = require('../routes/trips.js')
const usersRoute = require('../routes/users.js')

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', usersAuthRoute)
server.use('/api/trip', tripsRoute)
server.use('/api/user', usersRoute)

server.get('/', (req, res) => {
    res.send("It's Working!");
})

module.exports = server;