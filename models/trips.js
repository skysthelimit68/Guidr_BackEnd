const db = require("../data/dbConfig.js")

module.exports = {
    get,
    getBy,
    insert,
    remove,
    update
}

//getTripByTripId
function get(id){
    return db('trips')
    .where( { id })
    .first()
}

//getTripByfilter
function getBy(filter) {
    return db('trips')
    .where(filter)
}

function insert(trip) {
    return db('trips')
    .insert(trip, 'id')
    .then(([id]) => get(id));
}

function remove(id) {
    return db('trips')
    .where( {id} )
    .del();
}

async function update(id, changes) {
    return await db('trips')
    .where({id})
    .update(changes)
    .then(updatedTrip => updatedTrip ? get(id) : null);
}