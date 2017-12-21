'use strict';

const Core      = process.mainModule.require('nodejs-lib');
const BaseModel = require('./base');

class AclPermissionModel extends BaseModel {

    constructor(listName) {

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

        const Types = this.mongoose.Schema.Types;

        const schemaObject = {
            aclRole: {type: Types.ObjectId, ref: 'acl_roles'},
            aclResource: {type: String},
            actionName: {type: String}
        };

        // Creating DBO Schema
        const AclPermissionDBOSchema = this.createSchema(schemaObject);

        AclPermissionDBOSchema.post('save', () => {
            require('./acl_roles').findById(permission.aclRole, (err, role) => {
                if (err) return this.logger.error(err);

                this.acl.allow(role.name, permission.aclResource, permission.actionName);
            });
        });

        AclPermissionDBOSchema.post('remove', permission => {
            require('./acl_roles').findById(permission.aclRole, (err, role) => {
                if (err) return this.logger.error(err);

                this.acl.removeAllow(role.name, permission.aclResource, permission.actionName);
            });
        });

        // Registering schema and initializing model
        this.registerSchema(AclPermissionDBOSchema);
    }

    /**
     * Initialize ACL
     *
     * @param callback
     */
    initAcl(callback) {
        const aclModule = require('acl');

        this.acl = new aclModule(new aclModule.memoryBackend());

        this.model.find({})
            .populate('aclRole')
            .exec((err, permissions) => {
                if (err) return callback(err);

                permissions.forEach(permission => {

                    this.logger.info('ACL Allow: ' + permission.aclRole.name + ' - ' + permission.aclResource + ' [' + permission.actionName + ']');

                    this.acl.allow(permission.aclRole.name, permission.aclResource, permission.actionName);
                });

                callback(null, this.acl);
            });
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
