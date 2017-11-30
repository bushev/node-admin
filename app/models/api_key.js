'use strict';

/**
 * Random string library
 * @type {*|exports|module.exports}
 */
var randomString = require('randomstring');

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 *  User model
 */
class ApiKeyModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor (listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema () {

        var Types = this.mongoose.Schema.Types;

        // User Schema Object
        var schemaObject = {
            apiKey: {
                type: String,
                'default': function () {
                    return randomString.generate(20);
                }
            },
            userId: {type: Types.ObjectId, ref: 'user'},
            active: { type: Boolean, default: true}
        };

        /**
         * Creating DBO Schema
         */
        var ApiKeyDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(ApiKeyDBOSchema);
    }

    /**
     * Authenticate API request
     */
    authenticate (key, callback) {
        this.model.findOne({apiKey: key}, function (err, apiKey) {
            callback(err, !!apiKey);
        });
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new ApiKeyModel('apiKey');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;
