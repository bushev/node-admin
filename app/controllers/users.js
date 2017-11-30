'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminUsers controller
 */
class AdminUsers extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/user.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/users';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'user';

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name.first', 'name.last', 'email'];

        /**
         * Mongoose editable fields. We must have at least one item in array.
         *
         * @type {Array}
         * @private
         */
        this._modelEditableFields = ['name'];
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.name = {};
        result.name.first = this.request.body.firstName;
        result.name.last = this.request.body.lastName;
        result.isAdmin = this.request.body.isAdmin === "on";
        result.roles = this.request.body.roles || [];


        if (this.request.body.password) {

            if (this.request.body.password !== this.request.body.passwordConfirmation) {

                this.flash.addMessage('Password does not match the confirm password', Core.FlashMessageType.ERROR);

            } else {

                result.password = this.request.body.password;
            }
        }

        return result;
    }

    /**
     * Validating item before save
     *
     * @param item
     * @returns {array}
     */
    validateItem(item, validationCallback) {
        var validationMessages = [];
        var validationError = null;

        if (item.email == '') {
            validationError = new Error('Validation error');
            validationMessages.push('Email cannot be empty');
        }

        if (item.password == '') {
            validationError = new Error('Validation error');
            validationMessages.push('Password cannot be empty');
        }

        if (validationError == null) {
            var searchPattern = item.id != null ? {"$and": [{email: item.email}, {_id: {"$ne": item.id.toString()}}]} : {email: item.email};
            this.model.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(error, validationMessages);
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('User with the same email already exists in the database');
                    validationError = new Error('Validation error');
                }

                return validationCallback(validationError, validationMessages);
            });
        } else {
            validationCallback(validationError, validationMessages);
        }
    }

    onItemHasBeenInserted() {
        this.flash.addMessage("Item successfully inserted to the database!", Core.FlashMessageType.SUCCESS);
        this.terminate();
        var redirectToAction = "list";
        if (this.request.body.saveAction && this.request.body.saveAction === "save&CreateAnother")
            redirectToAction = "create";
        this.response.redirect(this.getActionUrl(redirectToAction));
    }

    beforeSave(item) {
        var clonedItem = item;
        if (this.request.body.saveAction && this.request.body.saveAction === "saveAs") {
            var UserDBO = this._model.model;
            clonedItem = new UserDBO(item);
            clonedItem._id = this._model.mongoose.Types.ObjectId();
            this._item = clonedItem;
        }
        return clonedItem;
    }


    onItemHasBeenSaved() {
        var redirectToAction = "list";
        var messageText = "Item successfully updated in the database!";
        if (this.request.body.saveAction && this.request.body.saveAction === "saveAs") {
            messageText = "Item cloned. You are now editing the new item.";
            redirectToAction = "edit";
        }
        this.flash.addMessage(messageText, Core.FlashMessageType.SUCCESS);
        this.terminate();
        this.response.redirect(this.getActionUrl(redirectToAction, this._item));
    }

    /**
     * Create item
     *
     * @param readyCallback
     */
    create(readyCallback) {
        super.create(function (err) {
            if (err) {
                return readyCallback(err);
            }

            this.loadRoles(readyCallback);
        }.bind(this));
    }

    /**
     * Edit item
     *
     * @param readyCallback
     */
    edit(readyCallback) {
        super.edit(function (err) {
            if (err) return readyCallback(err);

            this.loadRoles(readyCallback);
        }.bind(this));
    }

    /**
     * View item
     *
     * @param readyCallback
     */
    doView(readyCallback) {
        super.doView(function (err) {
            if (err) return readyCallback(err);

            this.loadRoles(readyCallback);
        }.bind(this));
    }

    /**
     * Load Users Roles
     * @param readyCallback
     */
    loadRoles(readyCallback) {
        require('../models/acl_roles.js').getAll(function (err, roles) {
            if (err) return callback();

            this.data.roles = roles;

            readyCallback();
        }.bind(this));
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = function (request, response) {
    var controller = new AdminUsers(request, response);
    controller.run();
};
