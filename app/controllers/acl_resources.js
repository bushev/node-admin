'use strict';

const AdminBaseCrudController = require('./basecrud.js');

/**
 * AdminAclResources controller
 */
class AdminAclResources extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response, next) {

        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/acl_resources.js');

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name'];

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/acl_resources';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'acl_resource';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        const result = super.getItemFromRequest(item);

        result.name    = this.request.body.name;
        result.actions = this.request.body.actions || [];

        return result;
    }

}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = (request, response, next) => {
    new AdminAclResources(request, response, next).run();
};
