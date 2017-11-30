// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
let Core = process.mainModule.require('nodejs-lib');

/**
 * Requiring base Controller
 */
let AdminBaseCrudController = require('./basecrud.js');

/**
 * Module for parsing multipart-form data requests
 */
let multiparty = require('multiparty');

/**
 * Async Module
 */
let async = require('async');

/**
 *  AdminAclRoles controller
 */
class AdminAssets extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {MongooseModel}
         * @private
         */
        this._model = require('../models/asset.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/assets';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'asset';

        /**
         * Name of container to upload
         *
         * @type {string}
         * @private
         */
        this._containerName = Core.ApplicationFacade.instance.config.env.PKG_CLOUD_CONTAINER_NAME || 'assets';

        /**
         * Field used for autocomplete suggestions
         *
         * @type {string}
         * @private
         */
        this._autocompleteSuggestionsField = 'name';

        /**
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name'];
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        let result = super.getItemFromRequest(item);

        result.name = this.request.body.name;

        return result;
    }

    /**
     * Init data
     *
     * @param readyCallback
     */
    init(readyCallback) {
        super.init(err => {
            if (err) return readyCallback(err);

            if (this.request.method === 'POST') {

                async.waterfall([callback => {

                    let form = new multiparty.Form();

                    form.parse(this.request, (err, fields, files) => {
                        if (err) return callback(err);

                        this.request.body = fields;

                        callback(null, files);

                    });

                }, (files, callback) => {

                    if (!files.file || !files.file[0]) {
                        return callback();
                    }

                    /**
                     * Upload file to the cloud
                     */
                    let client = new Core.PkgClient();

                    client.upload(files.file[0].path, {
                        containerName: this._containerName,
                        containerCdn: true,
                        fileName: files.file[0].originalFilename
                    }, (err, remoteFile) => {
                        if (err) return callback(err);

                        if (Core.ApplicationFacade.instance.config.env.PKG_CLOUD_CONTAINER_SUB_DOMAIN_REPLACE) {

                            this.request.body.cdnUrl = remoteFile.cdnUrl.replace(/http(s)?:\/\/.*\//, Core.ApplicationFacade.instance.config.env.PKG_CLOUD_CONTAINER_SUB_DOMAIN_REPLACE);

                        } else {

                            this.request.body.cdnUrl = remoteFile.cdnUrl;
                        }

                        this.request.body.fileName      = remoteFile.fileName;
                        this.request.body.containerName = this._containerName;

                        callback();
                    });

                }], readyCallback);

            } else {
                readyCallback();
            }

        });
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
module.exports = AdminAssets;