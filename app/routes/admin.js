'use strict';

const merge = require('merge');
const Core  = process.mainModule.require('nodejs-lib');

module.exports = () => {

    let routes = {
        'get|/admin': 'index.js',
        'get,post|/admin/account-settings': 'account-settings.js'
    };

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_USERS === 'yes') {

        routes = merge(routes, {
            // User management routes
            'get|/admin/users': 'users.js',
            'get|/admin/users/page/:page': 'users.js',
            'get,post|/admin/users/:action': 'users.js',
            'get,post|/admin/users/:id/:action': 'users.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_LOGS === 'yes') {

        routes = merge(routes, {
            // System Log route
            'get|/admin/system_logs': 'system_logs.js',
            'get|/admin/system_logs/page/:page': 'system_logs.js',
            'get|/admin/system_logs/:action': 'system_logs.js',
            'get|/admin/system_logs/:id/:action': 'system_logs.js',

            // Audit Log routes
            'get|/admin/audit_logs': 'audit_logs.js',
            'get|/admin/audit_logs/page/:page': 'audit_logs.js',
            'get|/admin/audit_logs/:action': 'audit_logs.js',
            'get|/admin/audit_logs/:id/:action': 'audit_logs.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_QUEUE === 'yes') {

        routes = merge(routes, {
            // Queue Jobs routes
            'get|/admin/queue_tasks': 'queue_tasks.js',
            'get|/admin/queue_tasks/page/:page': 'queue_tasks.js',
            'get,post|/admin/queue_tasks/:action': 'queue_tasks.js',
            'get,post|/admin/queue_tasks/:id/:action': 'queue_tasks.js',

            // Queue Archive Jobs routes
            'get|/admin/queue_tasks_archives': 'queue_tasks_archive.js',
            'get|/admin/queue_tasks_archives/page/:page': 'queue_tasks_archive.js',
            'get,post|/admin/queue_tasks_archives/:action': 'queue_tasks_archive.js',
            'get,post|/admin/queue_tasks_archives/:id/:action': 'queue_tasks_archive.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_WEB_HOOKS === 'yes') {

        routes = merge(routes, {
            // Webhook Events management routes
            'get|/admin/webhookevents': 'webhookevents.js',
            'get|/admin/webhookevents/page/:page': 'webhookevents.js',
            'get,post|/admin/webhookevents/:action': 'webhookevents.js',
            'get,post|/admin/webhookevents/:id/:action': 'webhookevents.js',

            // Webhooks management routes
            'get|/admin/webhooks': 'webhooks.js',
            'get|/admin/webhooks/page/:page': 'webhooks.js',
            'get,post|/admin/webhooks/:action': 'webhooks.js',
            'get,post|/admin/webhooks/:id/:action': 'webhooks.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_NOTIFICATIONS === 'yes') {

        routes = merge(routes, {
            // System notifications routes
            'get|/admin/notifications': 'notifications.js',
            'get|/admin/notifications/page/:page': 'notifications.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_API_KEYS === 'yes') {

        routes = merge(routes, {
            // API Keys routes
            'get|/admin/api_keys': 'api_keys.js',
            'get|/admin/api_keys/page/:page': 'api_keys.js',
            'get,post|/admin/api_keys/:action': 'api_keys.js',
            'get,post|/admin/api_keys/:id/:action': 'api_keys.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_CONFIGURATION === 'yes') {

        routes = merge(routes, {
            // Configuration management routes
            'get|/admin/configurations': 'configuration.js',
            'get,post|/admin/configurations/:action': 'configuration.js',
            'get,post|/admin/configurations/:id/:action': 'configuration.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_ACL === 'yes') {

        routes = merge(routes, {
            // ACL Roles management routes
            'get|/admin/acl_roles': 'acl_roles.js',
            'get|/admin/acl_roles/page/:page': 'acl_roles.js',
            'get,post|/admin/acl_roles/:action': 'acl_roles.js',
            'get,post|/admin/acl_roles/:id/:action': 'acl_roles.js',

            // ACL Permissions management routes
            'get|/admin/acl_permissions': 'acl_permissions.js',
            'get|/admin/acl_permissions/page/:page': 'acl_permissions.js',
            'get,post|/admin/acl_permissions/:action': 'acl_permissions.js',
            'get,post|/admin/acl_permissions/:id/:action': 'acl_permissions.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_ASSETS === 'yes') {

        routes = merge(routes, {
            // Assets management
            'get|/admin/assets': 'assets.js',
            'get|/admin/assets/page/:page': 'assets.js',
            'get,post|/admin/assets/:action': 'assets.js',
            'get,post|/admin/assets/:id/:action': 'assets.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_PUSH === 'yes') {

        routes = merge(routes, {
            // PUSH Notifications routes
            'get|/admin/push_notifications': 'push_notification.js',
            'get|/admin/push_notifications/page/:page': 'push_notification.js',
            'get,post|/admin/push_notifications/:action': 'push_notification.js',
            'get,post|/admin/push_notifications/:id/:action': 'push_notification.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_JOBS === 'yes') {

        routes = merge(routes, {
            // Job routes
            'get|/admin/jobs': 'job.js',
            'get|/admin/jobs/page/:page': 'job.js',
            'get,post|/admin/jobs/:action': 'job.js',
            'get,post|/admin/jobs/:id/:action': 'job.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_SEO === 'yes') {

        routes = merge(routes, {
            // SEO Data routes
            'get|/admin/seo_data_common': 'seo_data_common.js',
            'get|/admin/seo_data_common/page/:page': 'seo_data_common.js',
            'get|/admin/seo_data_common/:action': 'seo_data_common.js',
            'get,post|/admin/seo_data_common/:action': 'seo_data_common.js',
            'get,post|/admin/seo_data_common/:id/:action': 'seo_data_common.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_ROBOTS === 'yes') {

        routes = merge(routes, {
            // Robot routes
            'get|/admin/robots': 'robot.js',
            'get|/admin/robots/page/:page': 'robot.js',
            'get|/admin/robots/:action': 'robot.js',
            'get,post|/admin/robots/:action': 'robot.js',
            'get,post|/admin/robots/:id/:action': 'robot.js'
        });
    }

    if (Core.ApplicationFacade.instance.config.env.NODEJS_ADMIN_NAVIGATION_TICKETS === 'yes') {

        routes = merge(routes, {
            // Tickets management routes
            'get|/admin/tickets': 'tickets.js',
            'get|/admin/tickets/page/:page': 'tickets.js',
            'get,post|/admin/tickets/:action': 'tickets.js',
            'get,post|/admin/tickets/:id/:action': 'tickets.js'
        });
    }

    return routes;
};
