'use strict';

const BaseModel = require('./base');

class WebPushNotificationModel extends BaseModel {

    constructor(listName) {
        super(listName);

        this.inFieldFilterFields = [{
            name: 'inFieldStatus',
            field: 'status'
        }];
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        const Types = this.mongoose.Schema.Types;

        const schemaObject = {

            // TODO

            user: {type: Types.ObjectId, ref: 'user', index: true},
            createdAt: {type: Date, 'default': Date.now, index: true}
        };

        const DBOSchema = this.createSchema(schemaObject);

        this.registerSchema(DBOSchema);
    }

    /**
     * Send WEB PUSH notification to user web browser
     *
     * @param options
     *
     * @param callback
     */
    send(options, callback) {

        throw new Error(`Not implemented`);
    }

    storeResult(result, callback) {

        throw new Error(`Not implemented`);
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new WebPushNotificationModel('web_push_notification');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;