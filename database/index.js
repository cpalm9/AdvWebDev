'use strict';

module.exports = People;

function People(db) {
    this.collection = db.collection('people');
}

// add a person to the database and return the ID
People.prototype.create = function(firstName, lastName) {
    var personToAdd = {
        first: firstName,
        last: lastName
    }
    var p = new Promise((resolve, reject) =>{
        this.collection.insertOne(personToAdd, (err) =>{
            if (err){
                reject(err);
            }
            else {
                resolve(personToAdd._id)
            }
        })
    })
    return p
};

// delete a person by ID
People.prototype.delete = function(id) {
    this.collection.remove({
        _id: id
    })
};

// find a person by ID
People.prototype.findById = function(id) {
    return this.collection.findOne({
        _id:id
    })
};

// get an array of people that match the last name
People.prototype.findByLastName = function(lastName) {
    return new Promise((resolve, reject) => {
        this.collection.find({last: lastName}, (err, result) => { 
            if(err){
                reject(err)
            }
            else {
                resolve(result.toArray())
            }
        })
    })
};

// update a persons last name
People.prototype.updateLastName = function(id, lastName) {
    this.collection.updateOne({_id:id}, {$set: {
        last: lastName
    }})
};