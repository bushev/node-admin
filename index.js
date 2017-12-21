'use strict';

/**
 * Requiring Core Library
 *
 * WARNING: Core modules MUST be included from TOP Level Module.
 * All dependencies for core module must be excluded from the package.json
 */
const Core = process.mainModule.require('nodejs-lib');

/**
 * Loader class for the model
 */
class Loader extends Core.AppBootstrap {
    /**
     * Model loader constructor
     */
    constructor() {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        /**
         * Module name
         *
         * @type {null}
         * @private
         */
        this._moduleName = 'NodeJS Admin Module';

        /**
         * Module version
         * @type {string}
         * @private
         */
        this._moduleVersion = '1.1.6';
    }

    /**
     * Initializing module configuration
     */
    init() {
        super.init();

        // Loading models
        this.applicationFacade.loadModels(__dirname + '/app/models');

        if (this.applicationFacade.server) {

            // Loading module routes
            this.applicationFacade.server.loadRoutes('/app/routes', __dirname);

            this.applicationFacade.server.initAcl(require('./app/models/acl_permissions'));
        }

        // Initializing Library Exports
        this.applicationFacade.registry.push('Admin.Controllers.BaseAuth', Loader.Admin.Controllers.BaseAuth);
        this.applicationFacade.registry.push('Admin.Controllers.BaseCRUD', Loader.Admin.Controllers.BaseCRUD);
        this.applicationFacade.registry.push('Admin.Models.ACLPermissions', Loader.Admin.Models.ACLPermissions);
        this.applicationFacade.registry.push('Admin.Models.ACLRoles', Loader.Admin.Models.ACLRoles);
        this.applicationFacade.registry.push('Admin.Models.ACLResources', Loader.Admin.Models.ACLResources);
        this.applicationFacade.registry.push('Admin.Models.Base', Loader.Admin.Models.Base);
        this.applicationFacade.registry.push('Admin.Models.Configuration', Loader.Admin.Models.Configuration);
        this.applicationFacade.registry.push('Admin.Models.LogAudit', Loader.Admin.Models.LogAudit);
        this.applicationFacade.registry.push('Admin.Models.LogSystem', Loader.Admin.Models.LogSystem);
        this.applicationFacade.registry.push('Admin.Models.Navigation', Loader.Admin.Models.Navigation);
        this.applicationFacade.registry.push('Admin.Models.Notification', Loader.Admin.Models.Notification);
        this.applicationFacade.registry.push('Admin.Models.QueueTask', Loader.Admin.Models.QueueTask);
        this.applicationFacade.registry.push('Admin.Models.QueueTaskArchive', Loader.Admin.Models.QueueTaskArchive);
        this.applicationFacade.registry.push('Admin.Models.User', Loader.Admin.Models.User);
        this.applicationFacade.registry.push('Admin.Models.Webhook', Loader.Admin.Models.Webhook);
        this.applicationFacade.registry.push('Admin.Models.WebhookEvent', Loader.Admin.Models.WebhookEvent);
        this.applicationFacade.registry.push('Admin.Models.Asset', Loader.Admin.Models.Asset);
        this.applicationFacade.registry.push('Admin.Models.APIKey', Loader.Admin.Models.APIKey);
        this.applicationFacade.registry.push('Admin.Models.PushNotification', Loader.Admin.Models.PushNotification);
        this.applicationFacade.registry.push('Admin.Models.Job', Loader.Admin.Models.Job);
        this.applicationFacade.registry.push('Admin.Models.SeoData', Loader.Admin.Models.SeoData);
        this.applicationFacade.registry.push('Admin.Models.Robot', Loader.Admin.Models.Robot);
        this.applicationFacade.registry.push('Admin.Models.Ticket', Loader.Admin.Models.Ticket);

        // Checking Symbolic links
        var fs = require('fs');
        try {
            if (!fs.existsSync(Core.ApplicationFacade.instance.basePath + '/public/adminAssets')) {
                fs.symlinkSync(__dirname + '/app/assets', Core.ApplicationFacade.instance.basePath + '/public/adminAssets', 'dir');
            }
        } catch (error) {
            console.error('ERROR: Failed to create symbolic links');
            console.error(error.message);
        }

        /**
         * Registering Templates ROOT
         */
        Core.ModuleView.registerTemplatesRoot(__dirname, 2);
    }

    /**
     * Bootstrapping module
     *
     * MongoDB is available on this stage
     */
    bootstrap() {
        super.bootstrap();

        if (process.env.IS_MASTER === 'yes') {

            Loader.Admin.Models.Navigation.addItem({
                name: 'Dashboard',
                icon: 'fa-tachometer',
                url: '/admin',
                order: 0
            });

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_USERS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Users',
                    icon: 'fa-users',
                    url: '/admin/users',
                    order: 100
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_LOGS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Logs',
                    icon: 'fa-list-alt',
                    order: 101,
                    subItems: [{
                        name: 'System Logs',
                        url: '/admin/system_logs'
                    }, {
                        name: 'Audit Logs',
                        url: '/admin/audit_logs'
                    }]
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_QUEUE === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Queue',
                    icon: 'fa-refresh',
                    order: 102,
                    subItems: [{
                        name: 'Task',
                        url: '/admin/queue_tasks'
                    }, {
                        name: 'Archive',
                        url: '/admin/queue_tasks_archives'
                    }]
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_WEB_HOOKS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Webhooks',
                    icon: 'fa-globe',
                    order: 103,
                    subItems: [{
                        name: 'Webhook Events',
                        url: '/admin/webhookevents'
                    }, {
                        name: 'Hooks',
                        url: '/admin/webhooks'
                    }]
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_NOTIFICATIONS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Notifications',
                    icon: 'fa-cloud',
                    url: '/admin/notifications',
                    order: 104
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_API_KEYS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'API Keys',
                    icon: 'fa-key',
                    url: '/admin/api_keys',
                    order: 105
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_CONFIGURATION === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Configuration',
                    icon: 'fa-cogs',
                    url: '/admin/configurations',
                    order: 106
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_ACL === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'ACL',
                    icon: 'fa-lock',
                    order: 106,
                    subItems: [{
                        name: 'Permissions',
                        url: '/admin/acl_permissions'
                    }, {
                        name: 'Resources',
                        url: '/admin/acl_resources'
                    }, {
                        name: 'Roles',
                        url: '/admin/acl_roles'
                    }]
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_ASSETS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Assets',
                    icon: 'fa-file-text',
                    url: '/admin/assets',
                    order: 107
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_PUSH === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'PUSH Notifications',
                    icon: 'fa-bolt',
                    url: '/admin/push_notifications',
                    order: 108
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_JOBS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Jobs',
                    icon: 'fa-tasks',
                    url: '/admin/jobs',
                    order: 109
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_SEO === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'SEO',
                    icon: 'fa-file-text-o',
                    url: '/admin/seo_data_common',
                    order: 110
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_ROBOTS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Robots',
                    icon: 'fa-android',
                    url: '/admin/robots',
                    order: 111
                });
            }

            if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_TICKETS === 'yes') {

                Loader.Admin.Models.Navigation.addItem({
                    name: 'Tickets',
                    icon: 'fa-envelope-o',
                    url: '/admin/tickets',
                    order: 112
                });
            }
        }
    }

    /**
     * Run module based on configuration settings
     */
    run() {
        super.run();
    }
}

/**
 * Exporting Library Classes
 *
 * @type {{Controllers: {BaseAuth: (AdminBaseController|exports|module.exports), BaseCRUD: (BaseCRUDController|exports|module.exports)}, Models: {ACLPermissions: (AclPermissionModel|exports|module.exports), ACLResources: (AclResourceModel|exports|module.exports), ACLRoles: (AclRoleModel|exports|module.exports), Base: (BaseModel|exports|module.exports), Configuration: (ConfigurationModel|exports|module.exports), LogAudit: (LogAuditModel|exports|module.exports), LogSystem: (LogSystemModel|exports|module.exports), Notification: (NotificationModel|exports|module.exports), QueueTask: (QueueTaskModel|exports|module.exports), QueueTaskArchive: (QueueTaskArchiveModel|exports|module.exports), User: (UserModel|exports|module.exports), Webhook: (WebhookModel|exports|module.exports), WebhookEvent: (WebhookEventsModel|exports|module.exports)}}}
 */
Loader.Admin = {
    Controllers: {
        BaseAuth: require('./app/controllers/base.js'),
        BaseCRUD: require('./app/controllers/basecrud.js'),
        BaseAPI: require('./app/controllers/baseapi.js')
    },
    Models: {
        ACLPermissions: require('./app/models/acl_permissions.js'),
        ACLRoles: require('./app/models/acl_roles.js'),
        ACLResources: require('./app/models/acl_resources'),
        Base: require('./app/models/base.js'),
        Configuration: require('./app/models/configuration.js'),
        Counters: require('./app/models/counters.js'),
        LogAudit: require('./app/models/log_audit.js'),
        LogSystem: require('./app/models/log_system.js'),
        Notification: require('./app/models/notification.js'),
        Navigation: require('./app/models/navigation.js'),
        QueueTask: require('./app/models/queue_task.js'),
        QueueTaskArchive: require('./app/models/queue_task_archive.js'),
        User: require('./app/models/user.js'),
        Webhook: require('./app/models/webhook.js'),
        WebhookEvent: require('./app/models/webhookevent.js'),
        Asset: require('./app/models/asset.js'),
        APIKey: require('./app/models/api_key.js'),
        PushNotification: require('./app/models/push_notification'),
        Job: require('./app/models/job'),
        SeoData: require('./app/models/seo_data_common'),
        Robot: require('./app/models/robot'),
        Ticket: require('./app/models/ticket')
    },
    Middlewares: {
        CheckForRequireLogin: require('./app/lib/middlewares/checkRequireLogin.js')
    }
};

/**
 * Exporting module classes and methods
 */
module.exports = Loader;
