'use strict';

const Core                = process.mainModule.require('nodejs-lib');
const AdminBaseController = require('./base.js');
const momentTimezone      = require('moment-timezone');

class AdminAccountSettings extends AdminBaseController {

    load(callback) {
        super.load(err => {
            if (err) return callback(err);

            if (this.isGetRequest) {

                this.data.timezones = momentTimezone.tz.names().map(name => {
                    return {
                        name: name,
                        offset: momentTimezone().tz(name).format('Z')
                    }
                }).sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (a.name < b.name) return -1;
                    return 0;
                });

                this.view(Core.ModuleView.htmlView(this._viewsPath + '/account-settings/index.swig'));

                callback();

            } else {

                // console.log('this.request.body: ');
                // console.log(this.request.body);

                this.request.user.timeZone = this.request.body.timeZone;

                this.request.user.save(err => {
                    if (err) return callback(err);

                    this.flash.addMessage('Account settings successfully stored!', Core.FlashMessageType.SUCCESS);
                    this.terminate();

                    this.response.redirect('/admin');

                    callback();
                });
            }
        });
    }
}

module.exports = (request, response, next) => {
    const controller = new AdminAccountSettings(request, response, next);
    controller.run();
};
