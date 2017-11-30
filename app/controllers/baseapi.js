'use strict';

/**
 * Async module
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 *  Admin base controller
 */
class BaseAPIController extends Core.Controllers.APIController {
    /**
     * Controller constructor
     */
    constructor (request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * ApiKey model
         *
         * @type {MongooseModel}
         * @private
         */
        this._apiKeyModel = require('../models/api_key');
    }

    /**
     * APIKey Model
     *
     * @returns {MongooseModel}
     */
    get apiKeyModel () {
        return this._apiKeyModel;
    }

    /**
     * Check API token
     *
     * @param readyCallback
     */
    preLoad (readyCallback) {
        async.waterfall([
            // Check if api_key exist
            function(callback) {
                if (!this.request.query.api_key) {
                    return callback(new Error('No API key provided'));
                }
                callback(null);
            }.bind(this),

            // Check api_key in DB
            function(callback) {
                this.apiKeyModel.authenticate(this.request.query.api_key, function (err, authenticated) {
                    if (err) {
                        return callback(err);
                    }
                    if (!authenticated) {
                        return callback(new Error('Invalid or non-active API key!'));
                    }
                    callback(null);
                });
            }.bind(this)
        ], function (error) {
            readyCallback(error);
        });
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = BaseAPIController;
