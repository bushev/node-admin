'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminWebhookEvents controller
 */
class AdminWebhookEvents extends AdminBaseCrudController {

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
        this._model = require('../models/webhookevent.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/webhookevents';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'webhookevent';
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new AdminWebhookEvents(request, response);
    controller.run();
};
