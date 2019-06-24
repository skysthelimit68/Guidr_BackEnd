const db = require ('../data/dbConfig.js')

module.exports = {
    get,
    getBy,
    insert,
    remove,
    update,
    getUserTrips
}

function get(id){
    if(id){
        return db('users')
        .where({id})
        .first()
    } else {
        return null;
    }
}

function getBy(filter) {
    return db('users')
    .where(filter)
}

function insert(user) {
    return db('users')
    .insert(user, 'id')
    .then(([id]) => get(id));
}

function remove(id) {
    return db('users')
    .where({id})
    .del();
}

function update(id, changes) {
    return db('users')
    .where({id})
    .update(changes)
    .then(updatedUser => updatedUser ? get(id) : null);
}

async function getUserTrips(id) {
    const user_id = id
    const trips =  await db('trips')
    .select(['title', 'shortDescription', 'image'])
    .where({ user_id })
    const sumResult = await getTotalDuration(id)
    const sumDuration = Array.from(sumResult)[0]
    return {sumDuration,trips}
}

function getTotalDuration(id) {
    const user_id = id
    return db('trips')
    .sum({"sum":'duration'})
    .groupBy('user_id')
    .where({user_id})
}

