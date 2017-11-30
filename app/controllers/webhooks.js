'use strict';

/**
 * Async library
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminWebhooks controller
 */
class AdminWebhooks extends AdminBaseCrudController {

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
        this._model = require('../models/webhook.js');

        /**
         * Population fields
         *
         * @type {string}
         * @private
         */
        this._modelPopulateFields = 'webhookEventId';

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/webhooks';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'webhook';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.webhookEventId = this.request.body.webhookEventId;
        result.url            = this.request.body.url;

        return result;
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

            this.loadEvents(readyCallback);
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

            this.loadEvents(readyCallback);
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

            this.loadEvents(readyCallback);
        }.bind(this));
    }

    loadEvents(readyCallback) {
        async.parallel([
            function (callback) {
                require('../models/webhookevent.js').getAll(function (err, webhookevents) {
                    if (err) {
                        return callback();
                    }
                    this.data.webhookevents = webhookevents;
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
    var controller = new AdminWebhooks(request, response);
    controller.run();
};
