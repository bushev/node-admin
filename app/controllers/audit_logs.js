'use strict';

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 * Async library
 */
const async = require('async');

/**
 *  AdminLogSystem controller
 */
class AdminLogAudit extends AdminBaseCrudController {

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
        this._model = require('../models/log_audit.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/audit_logs';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'log_audit';

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['diff'];

        /**
         * Population fields
         *
         * @type {string}
         * @private
         */
        this._modelPopulateFields = 'userId';
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

    load(readyCallback) {

        async.series([callback => {

            super.load(callback);

        }, callback => {

            this.loadFiltersData(callback);

        }], readyCallback);
    }

    /**
     * Load left search filters data
     *
     * @param callback
     */
    loadFiltersData(callback) {

        async.series([callback => {

            this.loadResources(callback);

        }, callback => {

            this.loadActions(callback);

        }], callback);
    }

    /**
     * Load resources types
     *
     * @param callback
     */
    loadResources(callback) {

        this.model.model.distinct('resource', (err, resources) => {
            if (err) return callback(err);

            this.data.filtersData = this.data.filtersData ? this.data.filtersData : {};

            this.data.filtersData.resources = resources;

            callback();
        });
    }

    /**
     * Load actions
     *
     * @param callback
     */
    loadActions(callback) {

        this.model.model.distinct('action', (err, actions) => {
            if (err) return callback(err);

            this.data.filtersData = this.data.filtersData ? this.data.filtersData : {};

            this.data.filtersData.actions = actions;

            callback();
        });
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
 module.exports = function (request, response) {
    var controller = new AdminLogAudit(request, response);
    controller.run();
};
