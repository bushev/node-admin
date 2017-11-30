'use strict';

const AdminBaseCrudController = require('./basecrud.js');

class AdminTickets extends AdminBaseCrudController {

    constructor(request, response, next) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/ticket.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/tickets';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'ticket';

        /**
         * Mongoose default fields. Used in getItemFromRequest().
         *
         * @type {Array}
         * @private
         */
        this._modelEditableFields = ['status'];

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name', 'email', 'status'];
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
    (new AdminTickets(request, response, next)).run();
};
