'use strict';

const AdminBaseCrudController = require('./basecrud.js');
const async                   = require('async');

class AdminAclPermissions extends AdminBaseCrudController {

    constructor(request, response, next) {

        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/acl_permissions.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/acl_permissions';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'acl_permission';
    }

    load(callback) {
        super.load(err => {
            if (err) return callback(err);

            async.parallel([callback => {

                require('../models/acl_resources').getAll((err, resources) => {
                    if (err) return callback();

                    this.data.resources = resources;

                    callback();
                });

            }, callback => {

                require('../models/acl_roles.js').getAll((err, roles) => {
                    if (err) return callback();

                    this.data.roles = roles;

                    callback();
                });

            }], callback);
        });
    }

    /**
     * Returns view pagination object
     * @override
     * @returns {{}}
     */
    getViewPagination() {
        return {
            currentPage: 1,
            pageSize: 999,
            basePath: this.getActionUrl('list')
        };
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        const result = super.getItemFromRequest(item);

        result.aclRole     = this.request.body.aclRole;
        result.aclResource = this.request.body.aclResource;
        result.actionRame  = this.request.body.actionRame;

        return result;
    }

}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = (request, response, next) => {
    new AdminAclPermissions(request, response, next).run();
};
