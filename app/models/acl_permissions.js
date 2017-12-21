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
            aclRole: {type: Types.ObjectId, ref: 'acl_roles', required: true},
            aclResource: {type: Types.ObjectId, ref: 'acl_resources', required: true},
            actionName: {type: String, required: true}
        };

        // Creating DBO Schema
        const DBOSchema = this.createSchema(schemaObject);

        DBOSchema.post('save', () => {

            // Rebuild ACL
            require('./acl_permissions').initAcl(err => {
                if (err) this.logger.error(err);
            });
        });

        DBOSchema.post('remove', () => {

            // Rebuild ACL
            require('./acl_permissions').initAcl(err => {
                if (err) this.logger.error(err);
            });
        });

        // Registering schema and initializing model
        this.registerSchema(DBOSchema);
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
            .populate('aclRole aclResource')
            .exec((err, permissions) => {
                if (err) return callback(err);

                permissions.forEach(permission => {

                    this.logger.info('ACL Allow: ' + permission.aclRole.name + ' - ' + permission.aclResource.name + ' [' + permission.actionName + ']');

                    this.acl.allow(permission.aclRole.name, permission.aclResource.name, permission.actionName);
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

        const validationMessages = [];

        const searchPattern = item.id !== null ? {
            $and: [{
                aclRole: item.aclRole,
                aclResource: item.aclResource,
                actionName: item.actionName
            }, {_id: {$ne: item.id}}]
        } : {aclRole: item.aclRole, aclResource: item.aclResource, actionName: item.actionName};

        this.findOne(searchPattern, (err, document) => {

            if (err) {
                validationMessages.push(error.message);
                return validationCallback(Core.ValidationError.create(validationMessages));
            }

            if (document && (!item.id || item.id !== document.id)) {

                validationMessages.push('This Acl Permission already exists in the database');
            }

            return validationCallback(Core.ValidationError.create(validationMessages));
        });
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new AclPermissionModel('acl_permissions');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;
