'use strict';

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminAclRoles controller
 */
class AdminAclRoles extends AdminBaseCrudController {

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
        this._model = require('../models/acl_roles.js');

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
        this._baseUrl = '/admin/acl_roles';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'acl_role';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.name = this.request.body.name;

        return result;
    }

}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new AdminAclRoles(request, response);
    controller.run();
};
