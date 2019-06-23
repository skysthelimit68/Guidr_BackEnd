const router = require('express').Router();

const bcrypt = require('bcryptjs');
const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');

router.post('/login', validateLoginCreds, (req, res) => {
    const { username, password } = req.body;
    Users.getBy({ username })
    .first()
    .then( user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            user.token = token
            res.status(200).json({username: user.username, token: user.token});
        } else {
            res.status(401).json({message: "Invalid Credential."})
        }
    })
    .catch( error => {
        res.status(500).json({messate: "Error Logging In", error: error.toString()})
    })
})

//generate json webtoken after successful login
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.name
    } 
    const options = {
        expiresIn: '1d'
    }

    return jwt.sign(payload, secrets.jwtSecret, options)
}

//middlewares

function validateLoginCreds(req, res, next) {
    if(req.body && req.body.username && req.body.password) {
        next();
    } else {
        res.status(400).json({ message: 'Please provide both a username and password for login'})
    }
}













module.exports = router;