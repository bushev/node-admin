'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Async events execution
 */
var async = require('async');

/**
 * Requiring Base Controller
 *
 * @type {*|exports|module.exports}
 */
var BaseController = require('./base.js');

/**
 *  Secured controller
 */
class SecuredController extends BaseController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);
    }

    get protectedActions() {
        return this._protected || [];
    }

    get aclResourceName() {
        if (this._aclResourceName == null) {
            this._logger.warn('aclResourceName was not defined!');
        }

        return this._aclResourceName || 'unknown';
    }

    isProtectedAction(actionName) {
        var isProtectedAction = false;
        this.protectedActions.forEach(function (protectedActionName) {
            if (actionName == protectedActionName) {
                isProtectedAction = true;
            }
        });
        return isProtectedAction;
    }

    getPermissionsForProtectedActions(userId, asyncCallback) {
        var actionsPermissionsMap = {};

        async.forEach(this.protectedActions, function (actionName, foreachCallback) {
            Core.ApplicationFacade.instance.server.acl.isAllowed(userId.toString(), this.aclResourceName.toLowerCase(), actionName.toLowerCase(), function (err, allowed) {
                if (err) return foreachCallback(err);

                actionsPermissionsMap[actionName.toLowerCase()] = allowed;
                foreachCallback();
            });
        }.bind(this), function (error) {
            asyncCallback(error, actionsPermissionsMap);
        });
    }

    executeTargetAction($actionName, asyncCallback) {

        var isProtectedResource         = this.isProtectedAction($actionName);
        this._super_executeTargetAction = super.executeTargetAction;
        var that                        = this;

        async.series([
            function (asyncCallback) {
                if (!isProtectedResource) {
                    return asyncCallback(null);
                } else {
                    Core.ApplicationFacade.instance.server.acl.isAllowed(that.request.user._id.toString(), this.aclResourceName.toLowerCase(), $actionName.toLowerCase(), function (err, allowed) {
                        if (err) return asyncCallback(err);

                        if (!allowed) {
                            that._logger.warn('Specified action is not permitted: %s', $actionName);
                            that.response.status(500).send("Specified action is not permitted");
                            that.terminate();
                            asyncCallback(new Error("Specified action is not permitted"));
                            return;
                        }

                        asyncCallback(null);
                    });
                }
            }.bind(this),
            function (asyncCallback) {
                that._super_executeTargetAction($actionName, asyncCallback);
            }
        ], function (error) {
            asyncCallback(error);
        });
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = SecuredController;