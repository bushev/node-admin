'use strict';

const apn       = require('apn');
const gcm       = require('node-gcm');
const merge     = require('merge');
const BaseModel = require('./base');

class PushNotificationModel extends BaseModel {

    constructor(listName) {
        super(listName);

        this.inFieldFilterFields = [{
            name: 'inFieldStatus',
            field: 'status'
        }, {
            name: 'inFieldPlatform',
            field: 'platform'
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

            deviceToken: {type: String, index: true, required: true},
            alert: {type: String, index: true, required: true},
            expiry: {type: Number},
            badge: {type: Number},
            sound: {type: String},

            payLoad: {type: Types.Mixed},
            platform: {type: String, enum: ['ios', 'android'], required: true, index: true},

            status: {type: String, enum: ['success', 'error'], required: true, index: true},
            error: {type: String, index: true},

            user: {type: Types.ObjectId, ref: 'user', index: true},
            createdAt: {type: Date, 'default': Date.now, index: true}
        };

        const DBOSchema = this.createSchema(schemaObject);

        this.registerSchema(DBOSchema);
    }

    /**
     * Send one push notification
     *
     * @param options
     * @param callback
     */
    send(options, callback) {

        if (options.platform === 'ios') {

            this.sendIos(options, callback);

        } else {

            this.sendAndroid(options, callback);
        }
    }

    /**
     * Send PUSH notification to iOS device
     *
     * @param options
     * @param options.key {string}
     * @param options.keyId {string}
     * @param options.teamId {string}
     * @param [options.production] {boolean}
     * @param options.topic {string} - app name
     * @param [options.user] {string|*} - user ID
     * @param options.platform {string} - mobile platform
     *
     * @param options.message
     * @param options.message.deviceToken {string}
     * @param [options.message.expiry] {number}
     * @param [options.message.badge] {number}
     * @param [options.message.sound] {string}
     * @param options.message.alert {string} - message to show
     * @param [options.message.payLoad] {object} - data payload
     *
     * @param callback
     */
    sendIos(options, callback) {

        const apnOptions = {
            token: {
                key: options.key,
                keyId: options.keyId,
                teamId: options.teamId
            },
            production: typeof options.production === 'boolean' ? options.production : false
        };

        let apnProvider = new apn.Provider(apnOptions);

        let notification = new apn.Notification();

        notification.expiry   = options.message.expiry || Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
        notification.badge    = options.message.badge || 1; // TODO: ?
        notification.sound    = options.message.sound || 'ping.aiff';
        notification.alert    = options.message.alert;
        notification.category = options.message.category;
        notification.payload  = options.message.payLoad || {};
        notification.topic    = options.topic;

        apnProvider.send(notification, options.message.deviceToken).then(result => {

            let errorString;

            if (result.failed.length > 0) {

                errorString = `${result.failed[0].status} - `;

                if (result.failed[0].response && result.failed[0].response.reason) {

                    errorString += `${result.failed[0].response.reason}`;
                }

                if (result.failed[0].error) {

                    errorString += ` ${result.failed[0].error}`;
                }
            }

            this.storeResult(merge(options, result, {error: errorString}), callback);

        }).catch(err => {

            this.storeResult(merge(options, {error: err.message}), callback);
        });
    }

    /**
     * Send PUSH notification to Android device
     *
     * @param options
     * @param options.serverKey {string} GCM server key
     * @param options.topic {string} - app name
     *
     * @param options.message
     * @param options.message.deviceToken {string}
     * @param options.message.alert {string} - message to show
     *
     * @param callback
     */
    sendAndroid(options, callback) {

        let sender = new gcm.Sender(options.gcmServerKey);

        let message = new gcm.Message({
            // collapseKey: 'demo',
            // priority: 'high',
            // contentAvailable: true,
            // delayWhileIdle: true,
            // timeToLive: 3,
            // restrictedPackageName: options.topic,
            // dryRun: true,
            data: options.message.payLoad || {},
            notification: {
                title: options.message.alert,
                icon: options.message.icon,
                body: options.message.body
            }
        });

        let regTokens = [options.message.deviceToken];

        sender.sendNoRetry(message, {registrationTokens: regTokens}, (err, result) => {
            if (err) {
                this.storeResult(merge(options, {error: err.message}), callback);
            } else {

                let error;

                if (result.success !== 1) {

                    error = `${require('util').inspect(result)}`;
                }

                this.storeResult(merge(options, result, {error: error}), callback);
            }
        });
    }

    storeResult(result, callback) {

        console.log('PushNotificationModel::storeResult: ' + require('util').inspect(result, {depth: 10}));

        modelInstance.insert({
            deviceToken: result.message.deviceToken,
            alert: result.message.alert,
            expiry: result.message.expiry,
            badge: result.message.badge,
            sound: result.message.sound,
            payLoad: result.message.payLoad,
            platform: result.platform,
            status: result.error ? 'error' : 'success',
            error: result.error,
            user: result.user
        }, (err, item) => {
            if (err) return callback(err);

            console.log('Stored push item:');
            console.log(item);

            callback(null, item);
        });
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new PushNotificationModel('push_notification');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;