'use strict';

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminLogSystem controller
 */
class AdminLogSystem extends AdminBaseCrudController {

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
        this._model = require('../models/log_system.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/system_logs';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'log_system';
    }

    load(readyCallback) {
        super.load(function (err) {
            if (err) return readyCallback(err);

            // TODO: Load filters
            readyCallback();

        }.bind(this));
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new AdminLogSystem(request, response);
    controller.run();
};
