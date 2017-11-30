'use strict';

const moment    = require('moment');
const BaseModel = require('./base');

class QueueTaskModel extends BaseModel {

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
            ended: Date,
            result: {}
        };

        // Creating DBO Schema
        const QueueTaskDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(QueueTaskDBOSchema);
    }

    /**
     *
     * @param options
     * @param [options.maxExecutionTime] - in seconds
     * @param [options.pollingIntervalMs]
     * @param [options.query]
     * @param callback
     */
    notifyAboutHangingTasks(options, callback) {

        if (typeof options === 'function') {

            callback = options;
            options  = {};
        }

        if (!options.maxExecutionTime) options.maxExecutionTime = 60 * 5; // 5 minute
        if (!options.pollingIntervalMs) options.pollingIntervalMs = 60 * 1000; // 1 minute

        setInterval(() => {

            const query = options.query || {
                    status: 'dequeued',
                    dequeued: {$lt: moment().subtract(options.maxExecutionTime, 'seconds').toISOString()}
                };

            modelInstance.model.find(query, (err, tasks) => {
                if (err) return callback(err);

                if (tasks.length > 0) {

                    callback(null, tasks);
                }
            });

        }, options.pollingIntervalMs);
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new QueueTaskModel('queue_task');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;