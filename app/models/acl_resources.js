'use strict';

const BaseModel = require('./base');
const async     = require('async');

class AclResourceModel extends BaseModel {

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
            name: {type: String, index: true, unique: true},
            actions: [{type: String}]
        };

        const DBOSchema = this.createSchema(schemaObject);

        DBOSchema.post('save', function () {

            // Action changed?
            // TODO: Rename actions in permissions collection???

            // Rebuild ACL
            require('./acl_permissions').initAcl(err => {
                if (err) $this.logger.error(err);
            });
        });

        // Remove all associated permissions
        DBOSchema.post('remove', function () {

            const aclResource = this;

            require('./acl_permissions').model.find({
                aclResource: aclResource.id
            }, (err, permissions) => {
                if (err) return $this.logger.error(err);

                async.eachSeries(permissions, (permission, callback) => {

                    permission.remove(callback);

                }, err => {
                    if (err) $this.logger.error(err);
                });
            });

            setTimeout(() => {
                // Rebuild ACL
                require('./acl_permissions').initAcl(err => {
                    if (err) $this.logger.error(err);
                });
            }, 1000);
        });

        // Registering schema and initializing model
        this.registerSchema(DBOSchema);
    }
}

const modelInstance = new AclResourceModel('acl_resources');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;