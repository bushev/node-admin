'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 * Async library
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 *  User Roles model
 */
class AclRoleModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * To Enable Audit traces.
         * 1. Call enableAudit()
         * 2. Do not forget to add `last_modified_by` field to this schema.
         */
        this.enableAudit();
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        var Types = this.mongoose.Schema.Types;

        var schemaObject = {
            "name": String,
            "last_modified_by": {type: Types.ObjectId, ref: 'user'}
        };

        //Creating DBO Schema
        var AclRoleDBOSchema = this.createSchema(schemaObject);

        AclRoleDBOSchema.post('remove', function () {
            var role = this;

            require('./acl_permissions').model.find({
                aclRole: role._id
            }, function (err, permissions) {
                if (err) return console.log(err);

                async.each(permissions, function (permission, callback) {

                    permission.remove(function (err) {
                        callback(err);
                    });

                }, function (err) {
                    if (err) console.log(err);
                })
            });
        });

        // Registering schema and initializing model
        this.registerSchema(AclRoleDBOSchema);
    }

    /**
     * Validating item before save
     *
     * @param item
     * @param validationCallback
     * @returns {[]}
     */
    validate(item, validationCallback) {
        var validationMessages = [];

        if (item.name == '') {
            validationMessages.push('Name cannot be empty');
        }

        if (validationMessages.length == 0) {
            var searchPattern = item.id != null ? {"$and": [{name: item.name}, {_id: {"$ne": item.id.toString()}}]} : {name: item.name};
            this.model.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(Core.ValidationError.create(validationMessages));
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('Acl Role with the same name already exists in the database');
                }

                return validationCallback(Core.ValidationError.create(validationMessages));
            });
        } else {
            validationCallback(Core.ValidationError.create(validationMessages));
        }
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new AclRoleModel('acl_roles');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;