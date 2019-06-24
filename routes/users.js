const router = require('express').Router();

const Users = require('../models/users.js');
const verifyToken = require('../middlewares/verifyToken.js');

router.get('/:id/trips', verifyToken, validateId, restricted, (req, res) => {
    Users.getUserTrips(req.params.id)
    .then( response => {
        res.status(200).json(response)
    })
    .catch( error => {
        res.status(500).json({messate: "Error registering", error: error.toString()})
    })
})

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

function restricted(req, res, next) {
    if(req.params.id == req.user.id) next();
    else {
        res.status(403).json({message: "You have no permission to view these trips"})
    }
}

/*
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
            res.status(403).json({message : "You have no permission to update this profile"})
        }
}
*/
module.exports = router;