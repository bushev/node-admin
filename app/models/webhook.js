'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 *  Client model class
 */
class WebhookModel extends BaseModel {
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

        var Types = this.mongoose.Schema.Types;

        var schemaObject = {
            webhookEventId: {type: Types.ObjectId, ref: 'webhookevent'},
            url: {type: String, required: true},
            updatedAt: {type: Date, 'default': Date.now},
            createdAt: {type: Date, 'default': Date.now}
        };

        //Creating DBO Schema
        var WebhookDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(WebhookDBOSchema);
    }

    /**
     * Validating item before save
     *
     * @param item
     * @param validationCallback
     * @returns {[]}
     */
    validate(item, validationCallback) {
        var validationMessages = [];


        if (!item.webhookEventId) {
            validationMessages.push('Webhook event cannot be empty');
        }

        if (!item.url) {
            validationMessages.push('Webhook URL cannot be empty');
        }

        validationCallback(Core.ValidationError.create(validationMessages));
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new WebhookModel('webhook');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;