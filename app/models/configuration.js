'use strict';

var BaseModel = require('./base');
const Core    = process.mainModule.require('nodejs-lib');

/**
 *  Configuration model class
 */
class ConfigurationModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Applocation Configuration
         *
         * @type {}
         * @private
         */
        this._configuration = null;
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        var schemaObject = {
            project: {
                name: {type: String}
            },
            projectConfig: {type: String},
            mandrill: {
                apiKey: {type: String},
                fromName: {type: String},
                fromEmail: {type: String}
            },
            pkgcloud: {
                /** For "rackspace" provider */
                provider: {type: String},
                userName: {type: String},
                apiKey: {type: String},
                region: {type: String},

                /** For "azure" provider */
                azureAccount: {type: String},
                azureAccessKey: {type: String}
            },
            frontui: {
                maintenance: {type: Boolean, default: false},
                requireLogin: {type: Boolean, default: false},
                enableLogin: {type: Boolean, default: true},
                enableRegistration: {type: Boolean, default: true}
            },
            authentication: {
                local: {
                    enabled: {type: Boolean, 'default': true}
                },
                ldap: {
                    enabled: {type: Boolean, 'default': false},
                    url: {type: String},
                    bindDn: {type: String},
                    bindCredentials: {type: String},
                    searchBase: {type: String},
                    searchFilter: {type: String}
                }
            }
        };

        // Creating DBO Schema
        var ConfigurationDBOSchema = this.createSchema(schemaObject);

        ConfigurationDBOSchema.post('save', () => {

            this.readConf(function (config) {
                Core.ApplicationFacade.instance.config.mergeConfig(config);
            });
        });

        // Registering schema and initializing model
        this.registerSchema(ConfigurationDBOSchema);
    }

    get conf() {
        return this._configuration;
    }

    /**
     * Read configuration from the database
     *
     * @param callback
     */
    readConf(callback) {
        this.model.find({}).lean().exec(function (err, configuration) {
            if (err) return console.log('Unable to get Configuration. ' + err.message);

            if (configuration.length === 0) {
                this._configuration = {};
                console.log('Configuration entry was not found in the Database.');
                return callback(this._configuration);
            }

            this._configuration = configuration[0];

            try {
                this._configuration.projectConfig = JSON.parse(this._configuration.projectConfig);
            } catch (e) {
                this._configuration.projectConfig = {};
            }

            console.log('#### Configuration loaded');

            if (callback != null) {
                callback(this._configuration);
            }
        }.bind(this));
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new ConfigurationModel('configuration');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;
