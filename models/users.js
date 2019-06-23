const db = require ('../data/dbConfig.js')

module.exports = {
    get,
    getBy,
    insert,
    remove,
    update
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