const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken.js');
const Trips = require('../models/trips.js');
const Users = require('../models/users.js')

router.get("/:id",  verifyToken, validateId, restricted, (req, res) => {
    res.status(200).json(req.trip)
})

router.post("/", verifyToken, validateTripData, restricted, (req, res) => {
    Trips.insert(req.trip)
    .then( trip => {
        res.status(201).json(trip);
    })
    .catch( error => {
        res.status(500).json({messate: "Error adding trip", error: error.toString()})
    })
})

router.put("/:id", verifyToken, validateId, restricted, validateUpdateData, (req, res) => {
    const changes = req.body
    Trips.update(req.params.id, changes)
    .then( trip => {
        res.status(200).json(trip)
    })
    .catch ( error => {
        res.status(500).json({message: "Error updating trip", error: error.toString()})
    })
})

router.delete("/:id", verifyToken, validateId, restricted, (req, res) => {
    
    Trips.remove(req.params.id)
    .then( response => {
        res.status(200).json({message: `Trip titled ${req.trip.title} has been deleted`})
    })
    .catch( error => {
        res.status(500).json({messate: "Error deleting trip", error: error.toString()})

    })
})

//middleware
function validateId(req, res, next) {
    if(req.params.id) {
        Trips.get(req.params.id) 
        .then( trip => {
            if(trip) {
                req.trip = trip
                next();
            } else {
                res.status(404).json({message: "trip not found"})
            }
        })
    } else {
        res.status(500).json({ message: "no valid trip id provided"})
    }
}

function validateTripData(req, res, next) {
    //check if req.body, user_id and title exist in the body
    if(req.body && req.body.user_id && req.body.title) {
    
        req.trip = req.body
        next();
        
    } else {
        res.status(400).json({ message: "trip data missing required inputs"})
    }
}

function validateUpdateData(req, res, next) {
    //check if the user try to change the user_id to user other than self
    if(req.body.user_id == req.user.id) next();
    else {
        res.status(403).json({message : "You have no permission to change the user id"})    }
}

function restricted(req, res, next) {
    //check if user_id in req.body (trip) matches user.id decoded from token
    if(req.trip.user_id == req.user.id) next();
    else {
        res.status(403).json({ message: "you have no permission to access this trip"})
    }
}

module.exports = router;



