'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 *  Base model
 */
class BaseModel extends Core.MongooseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Requiring system logger
         *
         * @type {*|exports|module.exports}
         */
        this._logger = Core.Logger;

        try {
            var currentModel = this.model;
        } catch (err) {

            if ('OverwriteModelError' === err.name) {
                return this._logger.log('Model %s is already defined', this._list);
            }

            if ('MissingSchemaError' !== err.name) {
                throw err;
            }

            // Defining current schema
            this.defineSchema();
        }
    }

    /**
     * Define Schema. Must be overriden in descendants.
     *
     * @abstract
     */
    defineSchema() {

    }

    /**
     * Enabling audit logs
     */
    enableAudit() {

        var $this = this;

        /**
         * Instance of Audit log model
         */
        this.logAudit = require('./log_audit');

        /**
         * Save old item to trace
         */
        this.schema.pre('save', function (next) {

            if (this.isNew) {
                return next();
            }

            $this.model.findById(this._id, function (err, item) {
                if (err) return next(err);

                this.oldItem = item.toObject();
                next();

            }.bind(this));
        });

        /**
         * Add trace on `create` and `modify`.
         */
        this.schema.post('save', function (item) {
            if (this.oldItem) {
                $this.logAudit.traceModelChange({
                    modified: true,
                    resource: $this._list,
                    item: item.toObject(),
                    oldItem: this.oldItem,
                    userId: item.last_modified_by
                });
            } else {
                $this.logAudit.traceModelChange({
                    created: true,
                    resource: $this._list,
                    item: item.toObject(),
                    userId: item.last_modified_by
                });
            }
        });

        /**
         * Add trace on `remove`.
         */
        this.schema.post('remove', function (item) {
            $this.logAudit.traceModelChange({
                removed: true,
                resource: $this._list,
                item: item.toObject(),
                userId: item.last_modified_by // TODO
            });
        });
    }
}

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = BaseModel;