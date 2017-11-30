'use strict';

const BaseModel = require('./base');

class SeoDataModel extends BaseModel {

    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        const Types = this.mongoose.Schema.Types;

        const schemaObject = {

            subDomain: {type: String, index: true},
            url: {type: String, index: true, required: true},

            title: {type: String},
            h1: {type: String},
            imageUrl: {type: String},

            description: {type: String},
            keywords: {type: String},

            content1: {type: String},
            content2: {type: String},
            content3: {type: String},
            content4: {type: String},

            published: {type: Boolean, default: false, index: true},

            yaOriginalTextId: {type: String, index: true},

            createdAt: {type: Date, default: Date.now, index: true},
            updatedAt: {type: Date, default: Date.now, index: true}
        };

        // Creating DBO Schema
        const DBOSchema = this.createSchema(schemaObject);

        DBOSchema.index({subDomain: 1, url: 1}, {unique: true});

        // Registering schema and initializing model
        this.registerSchema(DBOSchema);
    }

    /**
     * Load SEO data
     *
     * @param options
     * @param options.originalUrl {string}
     * @param [options.subDomain] {string}
     * @param callback
     */
    loadSeoData(options, callback) {

        let conditions = {
            url: options.originalUrl,
            published: true
        };

        if (options.subDomain) {

            conditions.subDomain = options.subDomain;

        } else {

            conditions.subDomain = {$exists: false}
        }

        modelInstance.findOne(conditions, callback);
    }
}

/**
 * Creating instance of the model
 */
let modelInstance = new SeoDataModel('seo_data_common');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;