'use strict';

const Core      = process.mainModule.require('nodejs-lib');
const BaseModel = require('./base');
const async     = require('async');

class AclRoleModel extends BaseModel {

    constructor(listName) {

        super(listName);

        /**
         * To Enable Audit traces.
         * 1. Call enableAudit()
         * 2. Do not forget to add `last_modified_by` field to this schema.
         */
        // this.enableAudit();
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        const $this = this;

        const schemaObject = {
            name: {type: String, index: true, unique: true}
        };

        // Creating DBO Schema
        const AclRoleDBOSchema = this.createSchema(schemaObject);

        AclRoleDBOSchema.post('remove', function () {

            const role = this;

            require('./acl_permissions').model.find({
                aclRole: role.id
            }, (err, permissions) => {
                if (err) return $this.logger.error(err);

                async.each(permissions, (permission, callback) => {

                    permission.remove(callback);

                }, err => {
                    if (err) return $this.logger.error(err);
                });
            });
        });

        // Registering schema and initializing model
        this.registerSchema(AclRoleDBOSchema);
    }
}

/**
 * Creating instance of the model
 */
const modelInstance = new AclRoleModel('acl_roles');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;