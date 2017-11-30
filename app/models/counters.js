'use strict';

/**
 * Base model
 */
let BaseModel = require('./base');

/**
 * Async library
 * @type {async|exports|module.exports}
 */
let async = require('async');

/**
 *  User Roles model
 */
class CountersModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        let schemaObject = {
            collectionName: {type: String, index: true, unique: true},
            seq: {type: Number}
        };

        // Creating DBO Schema
        let CountersDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(CountersDBOSchema);
    }

    /**
     * Get next ID
     *
     * @param name
     * @param callback
     */
    getNextSequence(name, callback) {

        this.model.findOneAndUpdate({collectionName: name}, {$inc: {seq: 1}}, {new: true, upsert: true}, (err, item) => {
            if (err) return callback(err);


            callback(null, item.seq);
        });
    }
}

/**
 * Creating instance of the model
 */
let modelInstance = new CountersModel('counters');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;