'use strict';

const _         = require('lodash');
const BaseModel = require('./base');

class NavigationModel extends BaseModel {

    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Navigation tree structure
         *
         * @type {null}
         * @private
         */
        this._navigation = [];
    }

    /**
     * Get sorted navigation menu
     *
     * @returns {Array}
     */
    get navigation() {

        return _.sortBy(this._navigation, ['order', 'name']);
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        const schemaObject = {
            dummy: {type: String}
        };

        // Creating DBO Schema
        const NavigationDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(NavigationDBOSchema);
    }

    /**
     * Add menu item
     *
     * @param options
     * @param options.name {string}
     * @param [options.icon] {string}
     * @param [options.url] {string}
     * @param [options.order] {number}
     * @param [options.subItems] [{}]
     * @param [options.subItems].name {string}
     * @param [options.subItems].url {string}
     */
    addItem(options) {

        if (!options.subItems) options.subItems = [];

        this._navigation.push(options);
    }
}

const modelInstance = new NavigationModel('navigation');

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;