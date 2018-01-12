'use strict';

const Core                    = process.mainModule.require('nodejs-lib');
const AdminBaseCrudController = require('./basecrud.js');
const async                   = require('async');
const kue                     = require('kue');

class AdminQueueTasks extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response, next) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response, next);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        // this._model = require('../models/queue_task.js');

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
        // this._modelSearchableFields = ['name', 'status'];
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

    load(callback) {

        const locals = {};

        let jobIds = [];

        async.series([callback => {
            this.canView(callback);
        }, callback => {
            this.onBeforeLoadList(callback);
        }, callback => {
            Core.ApplicationFacade.instance.queueClient.client.active((err, ids) => {
                if (err) return callback(err);
                jobIds = jobIds.concat(ids);
                callback();
            });
        }, callback => {
            Core.ApplicationFacade.instance.queueClient.client.inactive((err, ids) => {
                if (err) return callback(err);
                jobIds = jobIds.concat(ids);
                callback();
            });
        }, callback => {

            locals.data = {
                items: []
            };

            async.eachLimit(jobIds, 10, (id, callback) => {

                kue.Job.get(id, (err, job) => {
                    if (err) return callback(err);

                    const j = job.toJSON();

                    j.createdAt = new Date(+j.created_at);

                    console.log(j);

                    locals.data.items.push(j);

                    callback();
                });

            }, err => {
                if (err) return callback(err);

                callback();
            });

            // this.getListFiltered((err, data) => {
            //     if (err) return callback(err);
            //
            //     locals.data = data;
            //
            //     callback();
            // });

        }, callback => {
            // Initializing load list view and set page data
            if (locals.data != null) {
                for (var key in locals.data) {
                    if (locals.data.hasOwnProperty(key)) {
                        this.data[key] = locals.data[key];
                    }
                }
            }

            /**
             * Used in sorting() macro in SWIG
             */
            // this.data.filter = this.getCachedRequestFilter();
            // this.data.filter.sorting = this.getViewSorting();

            this.data.createActionUrl = this.getActionUrl('create');
            this.data.baseUrl = this._baseUrl;

            // Send DATA_READY event
            callback();

        }, callback => {
            this.loadItemsNotifications(callback);
        }, callback => {
            // Run after load items list
            this.onAfterLoadList(callback);
        }], err => {
            /**
             * Set output view object
             */
            this.view(this.getViewClassDefinition().htmlView(this.getViewFilename('list'), this.data, err));

            callback(err);
        });
    }

    /**
     * Initialize view view
     *
     * @param readyCallback
     */
    doView(callback) {
        this.canView(err => {
            if (err) return callback(err);

            this.data.isViewMode      = true;
            this.data.item            = this.item;
            this.data.cancelActionUrl = this.getActionUrl('list');
            this.data.editActionUrl   = this.getActionUrl('edit', this.item);
            if (this.isGetRequest || this.isHeadRequest) {
                this.view(this.getViewClassDefinition().htmlView(this.getViewFilename('view')));
                callback();
            } else {
                callback(new Error("Action isn't supported"));
            }
        });
    }

    /**
     * Loading item from the db
     *
     * @param readyCallback
     */
    loadItem(callback) {

        kue.Job.get(this.itemId, (err, item) => {
            if (err) {
                this.terminate();
                this.response.redirect(this.getActionUrl('list'));

                return callback(err);
            }


            if (item) {
                this._item = item;

                callback();

            } else {

                this.onItemNotFound(callback);
            }
        });
    }

    /**
     * Proceed with Delete operation
     *
     * @param readyCallback
     */
    doDelete(readyCallback) {

        this.canDelete(err => {
            if (err) return readyCallback(err);

            this.logger.info('Remove completed job #' + this.item.id);

            this.item.remove(err => {
                if (err) return readyCallback(err);

                this.terminate();
                this.response.redirect(this.getActionUrl('list'));

                readyCallback();
            });
        });
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    // getItemFromRequest(item) {
    //     var result = super.getItemFromRequest(item);
    //
    //     result.workerName  = this.request.body.workerName;
    //     result.commandName = this.request.body.commandName;
    //     result.priority    = this.request.body.priority || 1;
    //
    //     result.params = {};
    //
    //     if (this.request.body.params) {
    //
    //         this.request.body.params.forEach(param => {
    //             if (param.name && param.value) {
    //                 result.params[param.name] = param.value;
    //             }
    //         });
    //     }
    //
    //     return result;
    // }

    /**
     * Returns view sorting options
     *
     * @returns {{}}
     */
    // getViewSorting() {
    //
    //     let sorting = super.getViewSorting();
    //
    //     if (Object.keys(sorting).length === 0) {
    //
    //         sorting = {field: 'priority', order: 'desc'}; // default sorting
    //     }
    //
    //     return sorting;
    // }

    /**
     * Custom Loading item for Process action
     *
     * @param readyCallback
     */
    preLoad(readyCallback) {
        super.preLoad(function (err) {
            if (err) return readyCallback(err);

            /**
             * Loading item
             */
            if (this.request.params.action === 'process' && this.request.params.id) {
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
        if (this.request.method === 'GET') {
            this.view(Core.ModuleView.htmlView(this.getViewFilename('create')));
            readyCallback();
        } else {
            this.data.actionUrl = this.getActionUrl('create');
            let itemDetails     = this.getItemFromRequest({});

            console.log(itemDetails);

            try {
                // Try to create new queue task using existing Queue instance
                Core.ApplicationFacade.instance.queueClient.enqueue({
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

        if (this.request.method === 'GET') {

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

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = (request, response, next) => {
    new AdminQueueTasks(request, response, next).run();
};
