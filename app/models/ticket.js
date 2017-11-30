'use strict';

const Core      = process.mainModule.require('nodejs-lib');
const BaseModel = require('./base.js');
const async     = require('async');
const tempFile  = require('tempfile');
const zendesk   = require('node-zendesk');

class TicketModel extends BaseModel {

    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        this.inFieldFilterFields = [{
            name: 'inFieldStatus',
            field: 'status'
        }];
    }

    defineSchema() {

        const schemaObject = {
            type: {type: String, index: true, required: true},

            name: {type: String},
            email: {type: String, index: true, required: true},

            subject: {type: String},
            message: {type: String},

            device: {type: String, index: true},
            appName: {type: String, index: true},
            platform: {type: String, index: true},
            versionCode: {type: String, index: true},
            versionNumber: {type: String, index: true},
            screenshotBase64: {type: String},

            status: {type: String, index: true, required: true, 'enum': ['open', 'solved'], 'default': 'open'},

            updatedAt: {type: Date, 'default': Date.now, index: true},
            createdAt: {type: Date, 'default': Date.now, index: true}
        };

        const DBOSchema = this.createSchema(schemaObject);

        this.registerSchema(DBOSchema);
    }

    /**
     * Store ticket in collection
     *
     * @param ticketData
     * @param ticketData.type {string}
     * @param ticketData.subject {string}
     * @param ticketData.message {string}
     * @param ticketData.email {string}
     * @param [ticketData.name] {string}
     * @param [ticketData.screenshotBase64] {string}
     * @param [ticketData.customFields] [{id: {string}, value: {string}}, ...]
     * @param callback
     */
    storeTicket(ticketData, callback) {

        modelInstance.insert(ticketData, (err, ticket) => {
            if (err) this.logger.error(`TicketModel::storeTicket: ${err.message}`);

            callback(err, ticket);
        });
    }

    /**
     * Submit ticket to the ZenDesk
     *
     * @param ticketData
     * @param ticketData.type {string}
     * @param ticketData.subject {string}
     * @param ticketData.message {string}
     * @param ticketData.email {string}
     * @param [ticketData.name] {string}
     * @param [ticketData.screenshotBase64] {string}
     * @param [ticketData.customFields] [{id: {string}, value: {string}}, ...]
     * @param callback
     */
    submitZendeskTicket(ticketData, callback) {

        let attachment;

        const zendeskClient = zendesk.createClient({
            username: Core.ApplicationFacade.instance.config.env.ZENDESK_USERNAME,
            token: Core.ApplicationFacade.instance.config.env.ZENDESK_TOKEN,
            remoteUri: Core.ApplicationFacade.instance.config.env.ZENDESK_REMOTE_URI
        });

        async.series([callback => {

            if (!ticketData.screenshotBase64) return callback();

            const tmpFilePath = tempFile('.png');

            fs.writeFile(tmpFilePath, ticketData.screenshotBase64, 'base64', err => {
                if (err) return callback(err);

                let fileName = 'screenshot.png';

                zendeskClient.attachments.upload(tmpFilePath, {filename: fileName}, (err, statusCode, result) => {
                    if (err) return callback(err);
                    if (statusCode !== 201) return callback(new Error(`Unable to upload attachment, code ${statusCode}`));

                    attachment = result.upload;

                    callback();
                });
            });

        }], err => {
            if (err) return callback(err);

            const ticket = {
                subject: ticketData.subject,
                type: ticketData.type,
                comment: {
                    body: ticketData.message
                },
                requester: {
                    name: ticketData.name || 'New person',
                    email: ticketData.email
                },
                custom_fields: ticketData.customFields || []
            };

            if (attachment) {

                ticket.comment.uploads = [attachment.token];
            }

            zendeskClient.tickets.create({
                ticket
            }, (err, result) => {
                if (err) {
                    this.logger.error(ticketData);
                    this.logger.error(result);
                    return callback(err);
                }

                if (+result !== 201) {
                    this.logger.error(ticketData);
                    this.logger.error(result);

                    return callback(new Error(`Bad result code from ZenDesk (200 !== ${result})`));
                }

                callback();
            });
        });
    }
}

const modelInstance = new TicketModel('ticket');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;