'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

// Loading Async helpers
var async = require('async');

/**
 *  AdminAclPermissions controller
 */
class AdminAclPermissions extends AdminBaseCrudController {

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

    load(readyCallback) {
        super.load(function (err) {
            if (err) return readyCallback(err);

            async.parallel([function (callback) {
                // TODO: Maybe we can improve this to not use try-catch
                try {
                    Core.ApplicationFacade.instance.registry.load('Application.Models.ACLResources').getAll(function (err, resources) {
                        if (err) return callback();

                        this.data.resources = resources;

                        callback();
                    }.bind(this));
                } catch (ex) {
                    console.error(ex);
                    this.data.resources = [];
                    callback();
                }
            }.bind(this), function (callback) {

                require('../models/acl_roles.js').getAll(function (err, roles) {
                    if (err) return callback();

                    this.data.roles = roles;

                    callback();
                }.bind(this));

            }.bind(this)], readyCallback);
        }.bind(this));
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
        var result = super.getItemFromRequest(item);

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
module.exports = function (request, response) {
    var controller = new AdminAclPermissions(request, response);
    controller.run();
};
