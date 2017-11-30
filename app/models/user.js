'use strict';

/**
 * Requiring Core Library
 */
var Core = process.mainModule.require('nodejs-lib');

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 * Local passport strategy
 */
var LocalStrategy = require('passport-local').Strategy;

/**
 * Ldap passport strategy
 */
var LdapStrategy = require('passport-ldapauth');

/**
 * Requiring Crypto modules
 *
 * @type {*}
 */
var bcrypt = require('bcrypt-nodejs');

/**
 * Async library
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * Core path module
 *
 * @type {posix|exports|module.exports}
 */
const path = require('path');

/**
 * Core fs module
 *
 * @type {exports|module.exports}
 */
const fs = require('fs');

/**
 *  User model
 */
class UserModel extends BaseModel {
    /**
     * Model constructor
     */
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

        var Types = this.mongoose.Schema.Types;

        // User Schema Object
        var schemaObject = {
            "token": String,
            "password": String,
            "email": String,
            "phone": String,
            "isAdmin": Boolean,
            "createdAt": {type: Date, 'default': Date.now},
            "modifiedAt": {type: Date, 'default': Date.now},
            "isVerified": Boolean,
            firstName: {type: String},
            surName: {type: String},
            lastName: {type: String},

            "roles": [String],
            notifications: []
        };

        /**
         * Creating DBO Schema
         */
        var UserDBOSchema = this.createSchema(schemaObject);

        UserDBOSchema.virtual('fullName').get(function () {
            var names = [];

            if (this.firstName) names.push(this.firstName);
            if (this.lastName) names.push(this.lastName);

            return names.join(' ');
        });

        /**
         * Pre-save hook
         */
        UserDBOSchema.pre('save', function (next) {
            var user        = this;
            this.modifiedAt = Date.now();
            if (user.isModified('password')) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return next(err);
                    }

                    bcrypt.hash(user.password, salt, null, function (err, hash) {
                        if (err) {
                            return next(err);
                        }

                        user.password = hash;
                        next();
                    });
                });
            } else {
                return next();
            }
        });

        /**
         * Check is notification with specified type allowed for user
         */
        UserDBOSchema.methods.isNotificationAllowed = function (notificationType) {
            var result = false;

            if (notificationType != null && this.notifications != null) {
                for (var i = 0; i < this.notifications.length; i++) {
                    if (this.notifications[i].toLowerCase() == notificationType.toLowerCase()) {
                        return true;
                    }
                }
            }

            return result;
        };

        /**
         * Compare password with currently set password
         *
         * @param candidatePassword
         * @param callback
         */
        UserDBOSchema.methods.comparePassword = function (candidatePassword, callback) {
            var user = this;
            bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
                if (err) {
                    return callback(err);
                } else {
                    callback(null, isMatch);
                }
            });
        };

        // Registering schema and initializing model
        this.registerSchema(UserDBOSchema);
    }

    /**
     * Passport instance
     *
     * @returns {*|UserModel.passport}
     */
    get passport() {
        return this._passport;
    }

    /**
     * Registering passport handlers
     *
     * @param passport
     */
    registerPassportHandlers(passport) {
        var userModel = this;

        // Initializing passport
        this._passport = passport;

        this._logger.info('## Registering Authentication Strategies.');
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            userModel.findById(id, function (err, user) {
                if (err) {
                    console.error(err);
                    return done(err);
                }

                (user.roles || []).forEach(function (role) {
                    Core.ApplicationFacade.instance.server.acl.addUserRoles(user._id.toString(), role);
                });

                done(null, user);
            });
        });

        var authentication = Core.ApplicationFacade.instance.config.env.authentication;

        if (authentication && authentication.ldap && authentication.ldap.enabled === true) {
            /**
             * LDAP: Sign in using Email and Password.
             */
            passport.use(new LdapStrategy({
                usernameField: 'email',
                server: {
                    url: authentication.ldap.url,
                    bindDn: authentication.ldap.bindDn,
                    bindCredentials: authentication.ldap.bindCredentials,
                    searchBase: authentication.ldap.searchBase,
                    searchFilter: authentication.ldap.searchFilter,
                    tlsOptions: {
                        rejectUnauthorized: false
                    }
                }
            }, function (user, done) {

                userModel._logger.debug('Trying to Authenticate user %s.', require('util').inspect(user));

                async.waterfall([function (callback) {

                    // Try find user in the local database
                    userModel.findOne({email: user.mail}, callback);

                }, function (databaseUser, callback) {

                    if (!databaseUser) {
                        // Create local user if it's not exist
                        userModel.insert({
                            email: user.mail,
                            firstName: user.displayName,
                            isAdmin: false
                        }, callback);
                    } else {
                        callback(null, databaseUser);
                    }

                }], done);
            }));
        }

        // Local strategy enabled by default but can be disabled in Configuration
        if (!authentication || !authentication.local || authentication.local.enabled !== false) {
            /**
             * Local: Sign in using Email and Password.
             */
            passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {

                email = email.toLowerCase();

                userModel._logger.debug('Trying to Authenticate user %s.', email);

                userModel.findOne({email: email}, function (err, user) {
                    if (!user) {
                        return done(null, false, {message: 'Email ' + email + ' not found'});
                    }
                    user.comparePassword(password, function (err, isMatch) {
                        if (isMatch) {
                            return done(null, user);
                        }
                        done(null, false, {message: 'Invalid email or password.'});
                    });
                });
            }));
        }
    }

    authenticate(request, callback) {
        var userModel = this;

        var authentication = Core.ApplicationFacade.instance.config.env.authentication;

        async.waterfall([function (callback) {

            if (authentication && authentication.ldap && authentication.ldap.enabled === true) {

                userModel.passport.authenticate('ldapauth', function (err, user, info) {

                    if (err) {
                        userModel._logger.warn(err.dn);
                        userModel._logger.warn(err.code);
                        userModel._logger.warn(err.name);
                        userModel._logger.warn(err.message);
                        return callback(err);
                    }

                    callback(null, user, info);

                })(request);

            } else {

                callback(null, null, null);
            }

        }, function (user, info, callback) {

            if (user) return callback(null, user);

            // Local strategy enabled by default but can be disabled in Configuration
            if (!authentication || !authentication.local || authentication.local.enabled !== false) {

                userModel.passport.authenticate('local', function (err, user, info) {

                    if (err) return callback(err);

                    callback(null, user, info);

                })(request);
            } else {

                callback(null, null, {message: 'Unable to authenticate. User not found or password is wrong.'});
            }

        }], callback);
    }

    /**
     * Validate item
     *
     * @param item
     * @param validationCallback
     */
    validate(item, validationCallback) {
        var validationMessages = [];

        if (item.email == '') {
            validationMessages.push('Email cannot be empty');
        }

        if (!item._id && item.password == '') {
            validationMessages.push('Password cannot be empty');
        }

        if (validationMessages.length == 0) {
            var searchPattern = item.id != null ? {"$and": [{email: item.email}, {_id: {"$ne": item.id.toString()}}]} : {email: item.email};
            this.model.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(Core.ValidationError.create(validationMessages));
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('User with the same email already exists in the database');
                }

                return validationCallback(Core.ValidationError.create(validationMessages));
            });
        } else {
            validationCallback(Core.ValidationError.create(validationMessages));
        }
    }

    /**
     * Send registration confirmation email for this user
     *
     * @param userEmail
     * @param callback
     */
    sendRegistrationConfirmationEmail(userEmail, callback) {
        var confirmationUrl = Core.ApplicationFacade.instance.config.env.BASE_URL;

        var internalErrorCallback   = function (err, item) {
            if (callback)
                callback(err, item);
        };
        var internalSuccessCallback = function (item) {
            if (callback)
                callback(null, item);
        };

        this.findOne({email: userEmail}, function (err, userDetails) {
            if (err != null) {
                internalErrorCallback(err);
            }

            // Notifying user via email
            if (userDetails != null && !userDetails.isVerified) {
                console.warn('Requesting registration confirmation for %s user by %s email', userDetails.fullName, userDetails.email);

                var swig     = require('swig');
                var swigHtml = swig.compileFile("app/views/emails/confirmations/html/registrationConfirmation.swig");
                var swigTxt  = swig.compileFile("app/views/emails/confirmations/text/registrationConfirmation.swig");

                var confirmationEmailData = {
                    fullName: userDetails.fullName,
                    confirmationUrl: confirmationUrl + '/' + userDetails._id,
                    supportEmail: 'support@MerchantWeb.com'
                };

                var message = {
                    html: swigHtml(confirmationEmailData),
                    text: swigTxt(confirmationEmailData)
                };

                var options = {
                    subject: "Please confirm your registration in MerchantWeb!"
                };
                var mailer  = new Core.Mailer();
                mailer.send([userDetails.email]
                    , message
                    , options
                    , internalSuccessCallback
                    , internalErrorCallback);
            } else {
                internalCallback(null, userDetails);
            }
        });
    }
}

let appUserModelPath = path.resolve(__dirname, '..', '..', '..', '..', 'app/models/user.js');
var modelInstance;

if (fs.existsSync(appUserModelPath)) {

    console.log('Use application user model: ' + appUserModelPath);
    modelInstance = require(appUserModelPath);

} else {

    console.log('Use user model from nodejs-admin');
    modelInstance = new UserModel('user');
}

/**
 * Exporting Model
 *
 * @type {Function}
 */
module.exports = modelInstance;
