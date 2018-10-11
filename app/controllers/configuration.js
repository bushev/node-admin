'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminConfiguration controller
 */
class AdminConfiguration extends AdminBaseCrudController {

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
        this._model = require('../models/configuration.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/configurations';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'configuration';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.project = {
            name: this.request.body.projectName
        };

        result.projectConfig = this.request.body.projectConfig;

        result.mandrill = {
            apiKey: this.request.body.mandrillApiKey,
            fromName: this.request.body.mandrillFromName,
            fromEmail: this.request.body.mandrillFromEmail
        };

        result.pkgcloud = {
            provider: this.request.body.pkgcloudProvider,
            apiKey: this.request.body.pkgcloudApiKey,
            userName: this.request.body.pkgcloudUserName,
            region: this.request.body.pkgcloudRegion,

            azureAccount: this.request.body.azureAccount,
            azureAccessKey: this.request.body.azureAccessKey
        };

        result.frontui = {
            maintenance: this.request.body.maintenance === "on",
            requireLogin: this.request.body.requireLogin === "on",
            enableLogin: this.request.body.enableLogin === "on",
            enableRegistration: this.request.body.enableRegistration === "on"
        };

        if (result.frontui.requireLogin) {
            result.frontui.enableLogin = true;
        }

        result.authentication = {
            local: {
                enabled: !!this.request.body.localEnabled
            },
            ldap: {
                enabled: !!this.request.body.ldapEnabled,
                url: this.request.body.ldapUrl,
                bindDn: this.request.body.ldapBindDn,
                bindCredentials: this.request.body.ldapBindCredentials,
                searchBase: this.request.body.ldapSearchBase,
                searchFilter: this.request.body.ldapSearchFilter
            }
        };

        return result;
    }

    load(readyCallback) {
        super.load(function (err) {
            if (err) return readyCallback(err);

            this.terminate();

            if (this.data.items.length === 0) {
                this.response.redirect(this.getActionUrl('create'));
            } else {
                this._model.readConf(function (config) {
                    Core.ApplicationFacade.instance.config.mergeConfig(config);
                });
                this.response.redirect(this.getActionUrl('edit', this.data.items[0]));
            }
        }.bind(this));
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new AdminConfiguration(request, response);
    controller.run();
};
