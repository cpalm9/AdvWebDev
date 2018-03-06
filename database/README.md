# Promises

### Objective

Learn to write database controllers.

### Local Testing

Sorry to say, there are no local tests with this assignment.

### Instructions

You'll only be modifying the `index.js` file for this assignment. You'll need to fill out the prototype functions provided.

#### The Database

- The assignment uses a mongo database (v3)

- You will save objects (documents) to the `people` collection.

- Each document will have a `first` and `last` property for the person`s first name and last name, respectively.

#### Prototype Methods

- **People.prototype.create** - Use `this.collection` to `insertOne` record into the mongo database. This function will receive the first and last name of the person. You must return a promise that will resolve to the `ObjectID` of the created instance.

- **People.prototype.delete** - Use `deleteOne` to delete a document from the database. This function will receive an `ObjectId` of the person to delete.

- **People.prototype.findById** - Use `findOne` to find a document from the database. This function will receive an `ObjectId` of the person to find.

- **People.prototype.findByLastName** - Use `find` to find all people with the last name that is passed into the function. This must return a promise that resolves to an array of people objects.

- **People.prototype.updateLastName** - Use `updateOne` to update a single person's last name. You will also need to use [`$set`](https://docs.mongodb.com/manual/reference/operator/update/set/).