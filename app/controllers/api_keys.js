'use strict';

/**
 * Async library
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * Path core library
 */
var path = require('path');

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminStores controller
 */
class AdminApiKeys extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor (request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {}
         * @private
         */
        this._model = require('../models/api_key.js');

        /**
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['apiKey'];

        /**
         * Mongoose Population fields
         * url: {@link http://mongoosejs.com/docs/populate.html|Mongoose Doc}
         *
         * @type {string}
         * @private
         */
        this._modelPopulateFields = 'userId';

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/api_keys';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'api_key';
    }

    /**
     * Create item
     *
     * @param readyCallback
     */
    create(readyCallback) {
        super.create(function (err) {
            if (err) {
                return readyCallback(err);
            }

            this.loadUsers(readyCallback);
        }.bind(this));
    }

    /**
     * Edit item
     *
     * @param readyCallback
     */
    edit(readyCallback) {
        super.edit(function (err) {
            if (err) return readyCallback(err);

            this.loadUsers(readyCallback);
        }.bind(this));
    }

    /**
     * View item
     *
     * @param readyCallback
     */
    doView(readyCallback) {
        super.doView(function (err) {
            if (err) return readyCallback(err);

            this.loadUsers(readyCallback);
        }.bind(this));
    }

    loadUsers(readyCallback) {
        async.parallel([
            function (callback) {
                require('../models/user.js').getAll(function (err, users) {
                    if (err) {
                        return callback();
                    }
                    this.data.users = users;
                    callback();
                }.bind(this));
            }.bind(this)
        ], readyCallback);
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new AdminApiKeys(request, response);
    controller.run();
};
