const router = require('express').Router();

const bcrypt = require('bcryptjs');
const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const verifyToken = require('../middlewares/verifyToken.js');

router.post('/register', validateRegistrationData,  (req, res) => {
    const user = req.user;
    const hash = bcrypt.hashSync(user.password, 12);
    user.password = hash;
    Users.insert(user)
        .then( user => {
            const token = generateToken(user);
            user.token = token;
            user.password = undefined
            res.status(200).json(user);
        })
        .catch(error => {
            res.status(500).json({messate: "Error registering", error: error.toString()})
        })
})

router.post('/login', validateLoginCreds, (req, res) => {
    const { username, password } = req.body;
    Users.getBy({ username })
    .first()
    .then( user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            user.token = token
            user.password = undefined;
            res.status(200).json(user);
        } else {
            res.status(401).json({message: "Invalid Credential."})
        }
    })
    .catch( error => {
        res.status(500).json({messate: "Error Logging In", error: error.toString()})
    })
})

/* 
//for testing middleware only
router.get('/:id', validateId, verifyToken, (req, res) => {
    res.status(200).json({id: req.body.user.id, username: req.body.user.username})
})
*/

//generate json webtoken after successful login
function generateToken(user) {
    const payload = {
        subject: user.id,
        username: user.username
    } 
    const options = {
        expiresIn: '1d'
    }
    return jwt.sign(payload, secrets.jwtSecret, options)
}

//middlewares

function validateId(req, res, next) {
    if(req.params.id) {
        Users.get(req.params.id) 
        .then( user => {
            if(user) {
                req.body.user = user
                next();
            } else {
                res.status(404).json({message: "user not found"})
            }
        })
    } else {
        res.status(500).json({ message: "no user id provided"})
    }
}

function validateLoginCreds(req, res, next) {
    if(req.body && req.body.username && req.body.password) {
        next();
    } else {
        res.status(400).json({ message: 'Require both a username and password for login'})
    }
}

function validateRegistrationData(req, res, next) {
    if(req.body && req.body.username && req.body.password) {
        req.user = {username: req.body.username, password: req.body.password}
        next();
    } else {
        res.status(400).json({message: "Require username and password for registration"})
    }
}













module.exports = router;