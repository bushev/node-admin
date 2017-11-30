'use strict';

const async                   = require('async');
const path                    = require('path');
const Core                    = process.mainModule.require('nodejs-lib');
const AdminBaseCrudController = require('./basecrud.js');

class AdminPushNotificationController extends AdminBaseCrudController {

    constructor(request, response, next) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/push_notification');

        /**
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['error', 'alert', 'deviceToken'];

        /**
         * Mongoose Population fields
         * url: {@link http://mongoosejs.com/docs/populate.html|Mongoose Doc}
         *
         * @type {string}
         * @private
         */
        this._modelPopulateFields = 'user';

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/push_notifications';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'push_notification';
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
    let controller = new AdminPushNotificationController(request, response, next);
    controller.run();
};
