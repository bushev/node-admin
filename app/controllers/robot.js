'use strict';

const Core                    = process.mainModule.require('nodejs-lib');
const AdminBaseCrudController = require('./basecrud.js');

class AdminRobotController extends AdminBaseCrudController {

    constructor(request, response, next) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/robot');

        /**
         * Mongoose default fields. Used in getItemFromRequest().
         *
         * @type {Array}
         * @private
         */
        this._modelEditableFields = ['name', 'subnet', 'userAgent', 'enabled'];

        /**
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name', 'subnet', 'userAgent'];

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/robots';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'robot';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        let result = super.getItemFromRequest(item);

        result.enabled = !!this.request.body.enabled;

        return result;
    }

    /**
     * Returns view sorting options
     *
     * @returns {{}}
     */
    getViewSorting() {

        let sorting = super.getViewSorting();

        if (Object.keys(sorting).length === 0) {

            sorting = {field: 'createdAt', order: 'desc'}; // default sorting
        }

        return sorting;
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = (request, response, next) => {
    let controller = new AdminRobotController(request, response, next);
    controller.run();
};
