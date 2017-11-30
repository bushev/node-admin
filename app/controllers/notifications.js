'use strict';

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

// Requiring Async helpers
var async = require('async');

/**
 *  Notifications controller
 *
 */
class Notifications extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/notification.js');

        /**
         * Population fields
         *
         * @type {string}
         * @private
         */
        this._modelPopulateFields = 'originator targetUser';

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/notifications';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'notification';

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['message', 'notificationType'];
    }

    /**
     * Create item
     *
     * @param readyCallback
     */
    create(readyCallback) {
        readyCallback(new Error('You are not allowed to create notifications'));
    }

    /**
     * Edit item
     *
     * @param readyCallback
     */
    edit(readyCallback) {
        readyCallback(new Error('You are not allowed to edit notifications'));
    }

    /**
     * Delete item
     *
     * @param readyCallback
     */
    doDelete(readyCallback) {
        readyCallback(new Error('You are not allowed to delete notifications'));
    }

}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new Notifications(request, response);
    controller.run();
};
