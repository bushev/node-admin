'use strict';

const path           = require('path');
const Core           = process.mainModule.require('nodejs-lib');
const momentTimezone = require('moment-timezone');

class AdminBaseController extends Core.Controller {

    /**
     * Pre-initialize data and event handlers
     */
    preInit(callback) {

        this._viewsPath = path.join(__dirname, '..', 'views', 'admin', this._viewsPath || '');

        this.data.navigation  = require('../models/navigation.js').navigation;
        this.data.originalUrl = this.request.originalUrl;

        if (!this.isAuthenticated()) {
            this.request.session.returnUrl = this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;
            this.flash.addMessage("You must be logged in to access Admin UI!", Core.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/admin/login');

            callback();
        } else if (!this.isAdminUser()) {

            this.flash.addMessage("You must be administrator to access Admin UI!", Core.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/');

            callback();
        } else {

            this.data.loggedUser = this.request.user;

            if (this.request.user.timeZone) {

                this.data.utcOffset = momentTimezone().tz(this.request.user.timeZone).format('Z');

            } else {

                this.data.utcOffset = 0;
            }

            callback();
        }
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
module.exports = AdminBaseController;
