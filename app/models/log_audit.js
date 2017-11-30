'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 * Merge module
 * @type {*|exports|module.exports}
 */
var merge = require('merge');

/**
 * Lodash helper
 */
const _ = require('lodash');

/**
 *  Resources model
 */
class LogAuditModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Response fields
         *
         * @type {string[]}
         */
        this.responseFields = ['resource', 'resourceId', 'action', 'userId'];

        /**
         *
         * @type {*[]}
         */
        this.inFieldFilterFields = [{
            name: 'inFieldResource',
            field: 'resource'
        }, {
            name: 'inFieldAction',
            field: 'action'
        }, {
            name: 'inFieldUserId',
            field: 'userId'
        }, {
            name: 'inFieldResourceId',
            field: 'resourceId'
        }];

        /**
         *
         * @type {Array}
         */
        this.customFilters = ['customDateRange'];
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        var Types = this.mongoose.Schema.Types;

        var schemaObject = {
            resource: {type: String, index: true},
            resourceId: {type: Types.ObjectId, index: true},
            action: {type: String, enum: ['removed', 'modified', 'created'], index: true},
            fieldsChanged: [{type: String, index: true}],
            diff: {type: String}, // a JSON-stringified array of objects, stringified so it is searchable
            userId: {type: Types.ObjectId, ref: 'user', index: true},
            createdAt: {type: Date, 'default': Date.now, index: true}
        };

        var option = {
            safe: {
                w: 0
            }
        }; // TODO: Extend

        // Creating DBO Schema
        var LogAuditDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(LogAuditDBOSchema);
    }

    /**
     * @param {Object} rawData - The data to log.
     * @param {string} rawData.resource - Name of affected resource.
     * @param {Object} rawData.resourceId - Affected resource ID.
     * @param {Object} [rawData.diff] - Difference, JSON object.
     * @param {Object} rawData.userId - User ID who made the change.
     */
    writeRaw(rawData) {
        this.insert(rawData);
    }

    /**
     * @param {Object} logData - The data to log.
     * @param {string} logData.resource - Name of affected resource.
     * @param {Object} logData.item - Affected instance.
     * @param {Object} [logData.oldItem] - Affected old instance.
     * @param {Object} [logData.created] - Flag, item was created.
     * @param {Object} [logData.modified] - Flag, item was modified.
     * @param {Object} [logData.removed] - Flag, item was removed.
     * @param {Object} [logData.userId] - User ID who made the change.
     * @param {Object} [logData.resourceModel] - Affected resource model.
     * @param {function} [callback] - Callback function.
     */
    traceModelChange(logData, callback) {

        if (typeof callback === 'undefined') callback = function () {
        };

        var rawData = {
            resource: logData.resource,
            resourceId: logData.item._id,
            userId: logData.userId
        };

        if (logData.created) {

            this.writeRaw(merge(rawData, {
                action: 'created'
            }));

            return callback();
        }

        if (logData.modified) {

            var diff = [];
            var auditIgnoredFields = ['__v', 'validationStatus', 'modifiedAt', 'modifiedBy', 'updatedAt', 'createdAt', 'createdBy'];

            if (logData.resourceModel && logData.resourceModel.auditIgnoredFields) {

                // merge common and model audit ignored fields together
                auditIgnoredFields = auditIgnoredFields.concat(logData.resourceModel.auditIgnoredFields);
            }

            for (var k in logData.item) {
                if (logData.item.hasOwnProperty(k)) {
                    if (auditIgnoredFields.indexOf(k) === -1) {
                        if (JSON.stringify(logData.item[k]) !== JSON.stringify(logData.oldItem[k])) {
                            diff.push({
                                name: k,
                                from: logData.oldItem[k],
                                to: logData.item[k]
                            });
                        }
                    }
                }
            }

            if (diff.length === 0) {

                return callback(); // Audit log is empty, no changes to store
            }

            this.writeRaw(merge(rawData, {
                action: 'modified',
                fieldsChanged: diff.map(diffEntry => diffEntry.name),
                diff: JSON.stringify(diff)
            }));

            callback();
        }

        if (logData.removed) {

            this.writeRaw(merge(rawData, {
                action: 'removed'
            }));

            return callback();
        }
    }

    /**
     * Build and add a conditions based on custom filters
     *
     * @param mongoFilters {{}}
     * @param customFilters {[{}]}
     *
     * @return {{}}
     */
    addCustomFilters(mongoFilters, customFilters) {

        // [ { filterName: 'customDateRange', filterValue: '10/15/2016 - 10/29/2016' } ]
        let customDateRange = _.find(customFilters, {filterName: 'customDateRange'});
        if (customDateRange && customDateRange.filterValue) {

            let from = customDateRange.filterValue.split(' - ')[0];
            let to = customDateRange.filterValue.split(' - ')[1];

            mongoFilters.$and.push({createdAt: {$gte: from}});
            mongoFilters.$and.push({createdAt: {$lte: to}});
        }

        return mongoFilters;
    }
}

/**
 * Creating instance of the model
 */
let modelInstance = new LogAuditModel('log_audit');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;