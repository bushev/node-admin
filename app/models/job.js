'use strict';

const Core         = process.mainModule.require('nodejs-lib');
const BaseModel    = require('./base');
const nodeSchedule = require('node-schedule');
const _            = require('lodash');

class JobModel extends BaseModel {

    constructor(listName) {
        super(listName);

        this.inFieldFilterFields = [{
            name: 'inFieldEnabled',
            field: 'enabled'
        }];

        /**
         * Currently scheduled jobs
         *
         * @type {Array}
         */
        this.scheduledJobs = [];
    }

    get jobsScheduled() {

        return this.scheduledJobs.length;
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        let $this = this;

        const schemaObject = {

            name: {type: String, required: true, index: true},

            schedule: {type: String, required: true},

            workerName: {type: String, index: true, required: true},
            commandName: {type: String, index: true, required: true},

            params: [{
                name: {type: String, required: true},
                value: {type: String, required: true}
            }],

            priority: {type: Number, 'default': 1, index: true, required: true},

            enabled: {type: Boolean, 'default': false, required: true},

            createdAt: {type: Date, 'default': Date.now, index: true}
        };

        const DBOSchema = this.createSchema(schemaObject);

        /**
         * Is this job scheduled?
         */
        DBOSchema.virtual('scheduled').get(function () {

            let scheduled = false;

            $this.scheduledJobs.forEach(scheduledJob => {
                if (scheduledJob.name === this.id) scheduled = true;
            });

            return scheduled;
        });

        DBOSchema.post('save', function (job) {

            let scheduledJob = _.find($this.scheduledJobs, {name: job.id});

            if (scheduledJob) {
                scheduledJob.cancel();

                $this.scheduledJobs = $this.scheduledJobs.filter(scheduledJob => scheduledJob.name !== job.id);
            }

            if (job.enabled) { // reschedule

                $this.scheduleJob(job);
            }
        });

        this.registerSchema(DBOSchema);
    }

    /**
     * Schedule all jobs
     *
     * @param [callback]
     */
    scheduleJobs(callback) {

        if (!callback) callback = (err) => {
            if (err) this.logger.error(err);
        };

        modelInstance.findAll({enabled: true}, (err, items) => {
            if (err) return callback(err);

            items.forEach(item => {

                this.scheduleJob(item);
            });

            callback();
        });
    }

    /**
     * Schedule one job
     *
     * @param job
     */
    scheduleJob(job) {

        this.logger.debug(`Scheduler: schedule ${job.workerName}:${job.commandName}, ` +
            `priority: ${job.priority}, schedule: ${job.schedule}`);

        let params = {};

        job.params.forEach(param => {
            params[param.name] = param.value;
        });

        let scheduledJob = nodeSchedule.scheduleJob(job.id, job.schedule, () => {

            this.logger.info(`Scheduler: process ${job.workerName}:${job.commandName}, ` +
                `priority: ${job.priority}`);

            Core.ApplicationFacade.instance.queue.enqueue({
                workerName: job.workerName,
                commandName: job.commandName,
                params: params,
                priority: job.priority
            });
        });

        this.scheduledJobs.push(scheduledJob);
    }

    /**
     * Cancel all scheduled jobs
     *
     * @param callback
     */
    cancelAll(callback) {

        this.scheduledJobs.forEach(scheduledJob => {
            scheduledJob.cancel();
        });

        this.scheduledJobs = [];

        callback();
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new JobModel('job');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;