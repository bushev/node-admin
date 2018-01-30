'use strict';

/**
 * Base model
 */
const BaseModel = require('./base');

/**
 *  Worker model
 */
class QueueTaskArchiveModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        const Types = this.mongoose.Schema.Types;

        const schemaObject = {
            name: {type: String, index: true},
            params: Types.Mixed,
            queue: {type: String, index: true},
            attempts: Types.Mixed,
            delay: Date,
            priority: Number,
            status: {type: String, index: true},
            enqueued: Date,
            dequeued: Date,
            ended: {type: Date, index: true},
            error: {type: String},
            stack: {type: String},
            result: {}
        };

        // Creating DBO Schema
        const QueueTaskArchiveDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(QueueTaskArchiveDBOSchema);
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new QueueTaskArchiveModel('queue_tasks_archive');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;