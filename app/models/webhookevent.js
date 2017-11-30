'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 *  Webhook Events Model class
 */
class WebhookEventsModel extends BaseModel {
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

        var schemaObject = {
            name: {type: String, unique: true, required: true},
            key: {type: String, unique: true, required: true},
            description: String
        };

        //Creating DBO Schema
        var WebhookEventDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(WebhookEventDBOSchema);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new WebhookEventsModel('webhookevent');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;