'use strict';

const Core                    = process.mainModule.require('nodejs-lib');
const AdminBaseCrudController = require('./basecrud.js');

class AdminJobController extends AdminBaseCrudController {

    constructor(request, response, next) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/job');

        /**
         * Mongoose default fields. Used in getItemFromRequest().
         *
         * @type {Array}
         * @private
         */
        this._modelEditableFields = ['name', 'schedule', 'workerName', 'commandName', 'priority', 'enabled'];

        /**
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name', 'schedule', 'workerName', 'commandName'];

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/jobs';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'job';
    }

    init(callback) {
        super.init(err => {
            if (err) return callback(err);

            this.registerAction('schedule');

            this.data.jobsScheduled = this.model.jobsScheduled;

            callback();
        });
    }

    /**
     * Schedule all tasks from MongoDB
     *
     * @param callback
     */
    schedule(callback) {

        this.model.cancelAll(err => {
            if (err) return callback(err);

            this.model.scheduleJobs(err => {
                if (err) return callback(err);

                this.flash.addMessage('All jobs scheduled', Core.FlashMessageType.SUCCESS);
                this.terminate();
                this.response.redirect(this.getActionUrl('list'));

                callback();
            });
        });
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        let result = super.getItemFromRequest(item);

        result.enabled = !!this.request.body.enabled;
        result.params  = [];

        if (this.request.body.params) {

            this.request.body.params.forEach(param => {
                if (param.name && param.value) {
                    result.params.push(param);
                }
            });
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
    let controller = new AdminJobController(request, response, next);
    controller.run();
};
