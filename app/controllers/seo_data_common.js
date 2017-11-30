'use strict';

const AdminCRUDController = require('./basecrud');

class AdminSeoDataPosts extends AdminCRUDController {

    constructor(request, response, next) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {Object}
         * @private
         */
        this._model = require('../models/seo_data_common.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/seo_data_common';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'seo_data_common';

        /**
         * Mongoose default fields. Used in getItemFromRequest().
         *
         * @type {Array}
         * @private
         */
        this._modelEditableFields = ['title', 'h1', 'content1', 'content2', 'content3', 'content4', 'description',
            'subDomain', 'url', 'keywords', 'imageUrl', 'published'];

        /**
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['title', 'h1', 'subDomain', 'url', 'keywords', 'content1', 'content2',
            'content3', 'content4', 'description'];

        /**
         * Model includes
         * @type {*[]}
         * @private
         */
        this._modelPopulateFields = '';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        let result = super.getItemFromRequest(item);

        result.published = !!this.request.body.published;

        if (!result.subDomain) {

            result.subDomain = undefined;
        }

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
    let controller = new AdminSeoDataPosts(request, response, next);
    controller.run();
};
