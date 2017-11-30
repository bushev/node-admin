'use strict';

const BaseModel = require('./base');
const nodeIP    = require('ip');
const moment    = require('moment');

class RobotModel extends BaseModel {

    constructor(listName) {
        super(listName);

        this.inFieldFilterFields = [{
            name: 'inFieldEnabled',
            field: 'enabled'
        }];

        /**
         * Robots subnets
         *
         * @type {Array}
         */
        this.subnets = [];

        /**
         * Robots userAgents strings
         *
         * @type {Array}
         */
        this.userAgents = [];

        /**
         * Time of cache creation
         */
        this.cachedAt = null;
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

            subnet: {type: String},

            userAgent: {type: String},

            enabled: {type: Boolean, 'default': false, required: true},

            createdAt: {type: Date, 'default': Date.now, index: true}
        };

        const DBOSchema = this.createSchema(schemaObject);

        // Cache all enabled robots in local variable
        DBOSchema.post('save', function () {

            $this.buildCache();
        });

        // Cache all enabled robots in local variable
        DBOSchema.post('remove', function () {

            $this.buildCache();
        });

        this.registerSchema(DBOSchema);

        setTimeout(() => {
            this.buildCache();
        }, 2000);
    }

    buildCache() {

        modelInstance.model.find({enabled: true}, (err, robots) => {
            if (err) return this.logger.error(err);

            this.subnets    = robots.filter(robot => !!robot.subnet).map(robot => robot.subnet);
            this.userAgents = robots.filter(robot => !!robot.userAgent).map(robot => robot.userAgent);

            this.cachedAt = new Date();

            this.logger.debug(`RobotModel::buildCache: subnets: ${this.subnets.length}, userAgents: ${this.userAgents.length}`);
        });
    }

    rebuildCacheIfExpired() {

        if (!this.cachedAt || moment(this.cachedAt).add(1, 'minute').isBefore(moment())) {

            this.buildCache();
        }
    }

    /**
     * Check IP in list
     *
     * @param ip
     */
    isIpExists(ip) {

        this.rebuildCacheIfExpired();

        let len = this.subnets.length;

        for (let i = 0; i < len; i++) {

            // console.log('this.subnets[i]: ' + this.subnets[i]);
            // console.log('ip: ' + ip);

            if (nodeIP.cidrSubnet(this.subnets[i]).contains(ip)) {

                return true;
            }
        }

        return false;
    }

    /**
     * Check User Agent in list
     *
     * @param userAgent
     */
    isUserAgentExists(userAgent) {

        this.rebuildCacheIfExpired();

        // console.log('userAgent: ' + userAgent);

        return this.userAgents.indexOf(userAgent) > -1;
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new RobotModel('robot');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;