
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminQueueTasksArchive controller
 */
class AdminQueueTasksArchive extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor (request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/queue_task_archive.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/queue_tasks_archives';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'queue_tasks_archive';
    }

    /**
     * Returns view sorting options
     *
     * @returns {{}}
     */
    getViewSorting() {

        let sorting = super.getViewSorting();

        if (Object.keys(sorting).length === 0) {

            sorting = {field: 'ended', order: 'desc'}; // default sorting
        }

        return sorting;
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function(request, response) {
    var controller = new AdminQueueTasksArchive(request, response);
    controller.run();
};
