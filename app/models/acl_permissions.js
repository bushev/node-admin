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
 *  Permissions model
 */
class AclPermissionModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * ACL instance
         * @type {null}
         */
        this.acl = null;
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        var Types = this.mongoose.Schema.Types;

        var schemaObject = {
            "aclRole": {type: Types.ObjectId, ref: 'acl_roles'},
            "aclResource": String,
            "actionName": String
        };

        //Creating DBO Schema
        var AclPermissionDBOSchema = this.createSchema(schemaObject);

        AclPermissionDBOSchema.post('save', function (permission) {
            require('./acl_roles').findById(permission.aclRole, function(err, role) {
                if (err) return console.log(err);

                this.acl.allow(role.name, permission.aclResource, permission.actionName);
            }.bind(this));
        }.bind(this));

        AclPermissionDBOSchema.post('remove', function (permission) {
            require('./acl_roles').findById(permission.aclRole, function(err, role) {
                if (err) return console.log(err);

                this.acl.removeAllow(role.name, permission.aclResource, permission.actionName);
            }.bind(this));
        }.bind(this));

        // Registering schema and initializing model
        this.registerSchema(AclPermissionDBOSchema);
    }

    /**
     * Initialize ACL
     *
     * @param callback
     */
    initAcl(callback) {
        var aclModule = require('acl');

        this.acl = new aclModule(new aclModule.memoryBackend());

        this.model.find({})
            .populate('aclRole', 'name')
            .exec(function (err, permissions) {
                if (err) return callback(err);

                permissions.forEach(function (permission) {

                    this.acl.allow(permission.aclRole.name, permission.aclResource, permission.actionName);
                    //console.log('ACL Allow: ' + permission.aclRole.name + ' - ' + permission.aclResource.name + ' [' + permission.actionName + ']');

                }.bind(this));

                callback(null, this.acl);

            }.bind(this));
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

        if (item.aclRole == '') {
            validationMessages.push('Acl Role cannot be empty');
        }

        if (item.aclResource == '') {
            validationMessages.push('Acl Resource cannot be empty');
        }

        if (item.actionName == '') {
            validationMessages.push('Acl Action Name cannot be empty');
        }

        if (validationMessages.length == 0) {
            var searchPattern = item.id != null ? {
                "$and": [{
                    aclRole: item.aclRole,
                    aclResource: item.aclResource,
                    actionName: item.actionName
                }, {_id: {"$ne": item.id.toString()}}]
            } : {aclRole: item.aclRole, aclResource: item.aclResource, actionName: item.actionName};
            this.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(Core.ValidationError.create(validationMessages));
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('This Acl Permission already exists in the database');
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
var modelInstance = new AclPermissionModel('acl_permissions');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;
