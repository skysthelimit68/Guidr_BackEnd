const router = require('express').Router();

const bcrypt = require('bcryptjs');
const Users = require('../models/users.js');
const jwt = require('jsonwebtoken');
const secrets = require('../config/secrets.js');
const verifyToken = require('../middlewares/verifyToken.js');

router.post('/register', validateUserData,  (req, res) => {
    const user = {username : req.body.username, password : req.body.password};
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
        res.status(500).json({message: "Error Logging In", error: error.toString() })
    })
})

//updating profile, not including password
router.put('/:id/update', validateId, verifyToken, validateUpdateData,  (req, res) => {
    const changes = req.body
    Users.update(req.params.id, changes)
        .then( user => {
            if(user) {
                const token = generateToken(user) //generating new token in case username was changed 
                user.password = undefined;
                user.token = token
                res.status(200).json(user)
            } else {
                res.status(404).json({message: "User does not exist"})
            }
        })
        .catch( error => {
            res.status(500).json({message: "Error updating user", error: error.toString() })
        })
    
})


//generate json webtoken after successful login / registration / update
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
    //if all login creds exist
    if(req.body && req.body.username && req.body.password) {
        next();
    } else {
        res.status(400).json({ message: 'Require both a username and password for login'})
    }
}

function validateUserData(req, res, next) {
    //check if all inputs exist

        if(req.body && req.body.username && req.body.password) {
            const username = req.body.username
            //check if username in use
            Users.getBy({ username })
            .then( user => {
                if((user.length > 0)) {
                    res.status(405).json({message: "username already in use"})
                } else {
                    //req.user = {username: req.body.username, password: req.body.password}
                    next();
                }
            })
            .catch( error => {
                res.status(500).json({messate: "Error validating inputs", error: error.toString()})
            })
        } else {
            res.status(400).json({message: "Require username and password for registration"})
        }
    
}

//this function is to check the new username is not already in use by another user
function validateUpdateData(req, res, next) {
    if(req.user.id == req.params.id) { // permission
    //only need to perform the following if user wish to change username --> checking for username duplication
        if(req.body.username && req.body.username !== req.user.username) {
            const username = req.body.username
            Users.getBy({username})
            .then( user => {
                if((user.length > 0)) {
                    res.status(405).json({message: "username already in use"})
                } else {
                    next();
                }
            })
            .catch( error => {
                res.status(500).json({messate: "Error validating update inputs", error: error.toString()})
            })
        } else {
            next();
        }
    } else {
            res.status(400).json({message : "You have no permission to update this profile"})
        }
}

module.exports = router;