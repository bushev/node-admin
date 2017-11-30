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
 *  AdminQueueTasks controller
 */
class AdminQueueTasks extends AdminBaseCrudController {

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
        this._model = require('../models/queue_task.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/queue_tasks';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'queue_tasks';

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name', 'status'];
    }

    /**
     * Initializing controller
     *
     * @param callback
     */
    init(callback) {
        super.init(function (err) {
            if (err) return callback(err);

            this.registerAction('process');

            callback();
        }.bind(this));
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.workerName  = this.request.body.workerName;
        result.commandName = this.request.body.commandName;
        result.priority    = this.request.body.priority || 1;

        result.params = {};

        if (this.request.body.params) {

            this.request.body.params.forEach(param => {
                if (param.name && param.value) {
                    result.params[param.name] = param.value;
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

            sorting = {field: 'priority', order: 'desc'}; // default sorting
        }

        return sorting;
    }

    /**
     * Custom Loading item for Process action
     *
     * @param readyCallback
     */
    preLoad(readyCallback) {
        super.preLoad(function (err) {
            if (err) return callback(err);

            /**
             * Loading item
             */
            if (this.request.params.action == 'process' && this.request.params.id) {
                var itemId = this.request.params.id;
                this.model.findById(itemId, function (error, item) {
                    if (error != null) {
                        this.flash.addMessage("Unable to process task! " + error.message, Core.FlashMessageType.ERROR);
                        this.terminate();
                        this.response.redirect(this.getActionUrl('list'));
                        return readyCallback(error);
                    }

                    if (item) {
                        this._item = item;
                    } else {
                        this.terminate();
                        this.response.redirect(this.getActionUrl('list'));
                        this.request.flash('error', "Failed to find Task. Task is not exists in the database!");
                    }
                    readyCallback();
                }.bind(this));
            } else {
                readyCallback();
            }
        }.bind(this));


    }

    /**
     * Custom Initialize create view
     *
     * @param readyCallback
     */
    create(readyCallback) {
        this.data.actionUrl = this.getActionUrl('create');
        this.data.baseUrl   = this.getActionUrl('list');
        if (this.request.method == 'GET') {
            this.view(Core.ModuleView.htmlView(this.getViewFilename('create')));
            readyCallback();
        } else {
            this.data.actionUrl = this.getActionUrl('create');
            let itemDetails     = this.getItemFromRequest({});

            console.log(itemDetails);

            try {
                // Try to create new queue task using existing Queue instance
                Core.ApplicationFacade.instance.queue.enqueue({
                    workerName: itemDetails.workerName,
                    commandName: itemDetails.commandName,
                    params: itemDetails.params,
                    priority: itemDetails.priority
                });

                this.flash.addMessage("New Task successfully created!", Core.FlashMessageType.SUCCESS);
                this.terminate();
                this.response.redirect(this.getActionUrl('list'));
                readyCallback();
            } catch (err) {
                this.flash.addMessage(err.message, Core.FlashMessageType.ERROR);
                this.data.item = itemDetails;
                this.view(Core.ModuleView.htmlView(this.getViewFilename('create')));
                return readyCallback();
            }
        }
    }

    process(readyCallback) {
        this.data.actionUrl = this.getActionUrl('create');
        this.data.baseUrl   = this.getActionUrl('list');

        if (this.request.method == 'GET') {

            this.item.delay  = new Date();
            this.item.status = 'queued';  // Set task as pending

            this.item.save(function (error, item) {
                if (error != null) {
                    this.flash.addMessage("Failed to process item! " + error.message, Core.FlashMessageType.ERROR);
                    this.terminate();
                    this.response.redirect(this.getActionUrl('list'));

                    return readyCallback(error);
                }

                this.flash.addMessage("Task has been queued.", Core.FlashMessageType.SUCCESS);
                this.terminate();
                this.response.redirect(this.getActionUrl('list'));

                // Send DATA_READY event
                readyCallback();
            }.bind(this));
        }
    }
}
;

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new AdminQueueTasks(request, response);
    controller.run();
};
