// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
let Core = process.mainModule.require('nodejs-lib');

/**
 * Requiring base Model
 */
let BaseModel = require('./base.js');

/**
 *  Client model class
 */
class AssetModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Name of container to upload
         *
         * @type {string}
         * @private
         */
        this._containerName = Core.ApplicationFacade.instance.config.env.PKG_CLOUD_CONTAINER_NAME || 'assets';
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        let Types = this.mongoose.Schema.Types;
        let $this = this;

        // User Schema Object
        let schemaObject = {
            name: {type: String, unique: true, required: true},
            assetType: {type: String, index: true},
            containerName: {type: String, index: true, required: true},
            fileName: {type: String, index: true, required: true},
            cdnUrl: {type: String, index: true},
            updatedAt: {type: Date, 'default': Date.now, index: true},
            createdAt: {type: Date, 'default': Date.now, index: true}
        };

        /**
         * Creating DBO Schema
         */
        let AssetDBOSchema = this.createSchema(schemaObject);

        AssetDBOSchema.post('remove', function () {
            /**
             * Remove from pkgcloud cloud
             */
            let client = new Core.PkgClient();

            client.client.removeFile($this._containerName, this.fileName, err => {
                if (err) console.log(err.stack);
            });
        });

        // Registering schema and initializing model
        this.registerSchema(AssetDBOSchema);
    }
}

/**
 * Creating instance of the model
 */
let modelInstance = new AssetModel('asset');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;