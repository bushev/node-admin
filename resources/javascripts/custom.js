jQuery(document).ready(function () {

    "use strict";

    function enableDisableBulkEditButton() {
        var btnDelete     = $(".bulk_delete"),
            selectedItems = $("[id^='checkbox_']:checkbox:checked");

        if (selectedItems.length === 0) {
            btnDelete.prop('disabled', true);
        } else {
            btnDelete.prop('disabled', false);
        }
    }

    // Bind bulk action buttons
    if ($('.bulk-actions').length) {
        // Select all rows from table
        $(".bulk-actions .check-all").click(function () {
            var checked = $(".bulk-actions .check-all").data("checked") === true;
            $(".bulk-actions .check-all").data("checked", !checked);
            $("[id^='checkbox_']:checkbox").prop("checked", !checked);
            enableDisableBulkEditButton();
        });

        // Bulk delete button, under construction....
        $(".bulk-actions .bulk_delete").click(function () {
            var form          = $(".bulk-delete-form"),
                selectedItems = $("[id^='checkbox_']:checkbox:checked");

            form.find("hidden").remove();

            if (selectedItems.length === 0) {
                alert("No items selected for deletion");
                return false;
            }

            if (confirm("Are you sure you want to delete the selected elements?")) {
                selectedItems.each(function (index, item) {
                    form.append('<input type="hidden" name="selectedItems" value="' + $(item).data('item-id') + '">');
                });
                return true;
            } else {
                return false;
            }
        });

        $(document).on('change', "[id^='checkbox_']:checkbox", function () {
            enableDisableBulkEditButton();
        });

        enableDisableBulkEditButton();
    }

    /*
     // We can't use this for all SELECT in app
     if (jQuery().select2) {
     jQuery("select").select2({
     minimumResultsForSearch: -1
     });
     }
     */

    $('.bs-data-picker').datepicker({});

    // Search filters binding
    if ($('.search-filters').length > 0) {

        $('.search-box #searchValue').keydown(function (e) {
            var basePath = $('.search-box #basePath').val();

            if (e.which === 13) {
                var searchValue = $(this).val();
                if (!searchValue) searchValue = '';
                var queryString = queryStringHelper.getUpdatedQueryString(window.location.search, 'filter[search]', searchValue);
                window.location = basePath + queryString;
                return false;
            }
        });

        $('.search-filters .search').click(function (e) {

            var queryString = window.location.search;

            $('[data-filter]').each(function () {
                var value     = $(this).val();
                var name      = $(this).data('filter');
                var inputType = $(this).prop('type');

                if (value) {
                    if (inputType === 'checkbox') {
                        if ($(this).prop('checked')) {
                            queryString = queryStringHelper.getUpdatedQueryString(queryString, 'filter[' + name + ']', value);
                        } else {
                            queryString = queryStringHelper.getUpdatedQueryString(queryString, 'filter[' + name + ']', '');
                        }
                    } else {
                        queryString = queryStringHelper.getUpdatedQueryString(queryString, 'filter[' + name + ']', value);
                    }
                } else {
                    queryString = queryStringHelper.getUpdatedQueryString(queryString, 'filter[' + name + ']', '');
                }
            });

            window.location = $('.search-box #basePath').val() + queryString;
        });

        $('.search-filters .reset').click(function () {

            var queryString = window.location.search;

            $('[data-filter]').each(function () {
                var name = $(this).data('filter');

                queryString = queryStringHelper.getUpdatedQueryString(queryString, 'filter[' + name + ']', '');
            });

            window.location = $('.search-box #basePath').val() + queryString;
        });
    }

    // Tooltip
    jQuery('.tooltips').tooltip({container: 'body'});

    // Popover
    jQuery('.popovers').popover();

    // Show panel buttons when hovering panel heading
    jQuery('.panel-heading').hover(function () {
        jQuery(this).find('.panel-btns').fadeIn('fast');
    }, function () {
        jQuery(this).find('.panel-btns').fadeOut('fast');
    });

    // Close Panel
    jQuery('.panel .panel-close').click(function () {
        jQuery(this).closest('.panel').fadeOut(200);
        return false;
    });

    // Minimize Panel
    jQuery('.panel .panel-minimize').click(function () {
        var t = jQuery(this);
        var p = t.closest('.panel');
        if (!jQuery(this).hasClass('maximize')) {
            p.find('.panel-body, .panel-footer').slideUp(200);
            t.addClass('maximize');
            t.find('i').removeClass('fa-minus').addClass('fa-plus');
            jQuery(this).attr('data-original-title', 'Maximize Panel').tooltip();
        } else {
            p.find('.panel-body, .panel-footer').slideDown(200);
            t.removeClass('maximize');
            t.find('i').removeClass('fa-plus').addClass('fa-minus');
            jQuery(this).attr('data-original-title', 'Minimize Panel').tooltip();
        }
        return false;
    });

    jQuery('.leftpanel .nav .parent > a').click(function () {

        var coll = jQuery(this).parents('.collapsed').length;

        if (!coll) {
            jQuery('.leftpanel .nav .parent-focus').each(function () {
                jQuery(this).find('.children').slideUp('fast');
                jQuery(this).removeClass('parent-focus');
            });

            var child = jQuery(this).parent().find('.children');
            if (!child.is(':visible')) {
                child.slideDown('fast');
                if (!child.parent().hasClass('active'))
                    child.parent().addClass('parent-focus');
            } else {
                child.slideUp('fast');
                child.parent().removeClass('parent-focus');
            }
        }
        return false;
    });


    // Menu Toggle
    jQuery('.menu-collapse').click(function () {
        if (!$('body').hasClass('hidden-left')) {
            if ($('.headerwrapper').hasClass('collapsed')) {
                $('.headerwrapper, .mainwrapper').removeClass('collapsed');
            } else {
                $('.headerwrapper, .mainwrapper').addClass('collapsed');
                $('.children').hide(); // hide sub-menu if leave open
            }
        } else {
            if (!$('body').hasClass('show-left')) {
                $('body').addClass('show-left');
            } else {
                $('body').removeClass('show-left');
            }
        }
        return false;
    });

    // Add class nav-hover to mene. Useful for viewing sub-menu
    jQuery('.leftpanel .nav li').hover(function () {
        $(this).addClass('nav-hover');
    }, function () {
        $(this).removeClass('nav-hover');
    });

    // For Media Queries
    jQuery(window).resize(function () {
        hideMenu();
    });

    hideMenu(); // for loading/refreshing the page
    function hideMenu() {

        if ($('.header-right').css('position') == 'relative') {
            $('body').addClass('hidden-left');
            $('.headerwrapper, .mainwrapper').removeClass('collapsed');
        } else {
            $('body').removeClass('hidden-left');
        }

        // Seach form move to left
        if ($(window).width() <= 360) {
            if ($('.leftpanel .form-search').length == 0) {
                $('.form-search').insertAfter($('.profile-left'));
            }
        } else {
            if ($('.header-right .form-search').length == 0) {
                $('.form-search').insertBefore($('.btn-group-notification'));
            }
        }
    }

    collapsedMenu(); // for loading/refreshing the page
    function collapsedMenu() {

        if ($('.logo').css('position') == 'relative') {
            $('.headerwrapper, .mainwrapper').addClass('collapsed');
        } else {
            $('.headerwrapper, .mainwrapper').removeClass('collapsed');
        }
    }

    // [AdminUI] Doctors Documents Edit page
    $('.add_doctor_document').click(function (e) {
        e.preventDefault();
        $('#doctor-documents').append('<div class="form-group">' +
            '<div class="col-sm-offset-4 col-sm-4">' +
            '<input type="file" class="form-control" name="documents"></div>' +
            '<div class="col-sm-4"><a href="#" class="remove_doctor_document">Remove document</a>' +
            '</div>' +
            '</div>' +
            '</div>');
    });

    // [AdminUI] Doctors Documents Edit page
    $('#doctor-documents').on('click', '.remove_doctor_document', function (e) {
        e.preventDefault();
        $(this).parent('div').parent('div').remove();
    });

    // [AdminUI] Acl Permissions table
    $('.resource_action_checkbox').on('click', function () {
        if ($(this).attr('checked')) {
            /**
             * Create permission
             */
            var data = {
                aclRole: $(this).data('role'),
                aclResource: $(this).data('resource'),
                actionName: $(this).data('action')
            };

            $.ajax({
                url: $(this).data('create_url'),
                method: 'POST',
                dataType: 'json',
                data: data
            }).done(function (data) {

                location.reload();

            }).fail(function (jqXHR, textStatus) {
                console.log(jqXHR, textStatus);
                location.reload();
            });
        } else {
            /**
             * Remove permission
             */
            $.ajax({
                url: $(this).data('base_url') + '/' + $(this).data('permission_id') + '/delete',
                method: 'GET'
            }).done(function (data) {

            }).fail(function (jqXHR, textStatus) {
                console.log(jqXHR, textStatus);
            });
        }
    });

    var paginationPanelSelector = $('.pagination');
    if (paginationPanelSelector.length > 0) {
        paginationPanelSelector.find('a').each(function () {
            $(this).attr('href', $(this).attr('href') + window.location.search);
        });
    }

    var bulkEdit = $('a[class="bulk-edit"]');
    if (bulkEdit.length > 0) {
        bulkEdit.attr('href', bulkEdit.attr('href') + window.location.search);
    }

    var bulkEditForm = $('.bulk-edit-form');
    if (bulkEditForm.length > 0) {
        bulkEditForm.attr('action', bulkEditForm.attr('action') + window.location.search);
    }

    var pageSizeSelector = $('#pageSizeSelector');
    if (pageSizeSelector.length > 0) {
        pageSizeSelector.on('change', function () {
            var queryString = queryStringHelper.getUpdatedQueryString(window.location.search, 'filter[pageSize]', $(this).val());
            window.location = $(this).attr('basePath') + queryString;

        });
    }

    var signUpPanelSelector = $(".panel-signup, .panel-signin");
    if (signUpPanelSelector.length > 0) {

        $(function () {
            $("input,select,textarea").not("[type=submit]").jqBootstrapValidation(
                {
                    preventSubmit: true,
                    autoAdd: {
                        helpBlocks: true
                    },
                    classNames: {
                        group: ".form-group",
                        warning: "has-warning",
                        error: "has-error",
                        success: "has-success"
                    },
                    submitError: function ($form, event, errors) {
                    },
                    submitSuccess: function ($form, event) {
                        checkUniquenessOfEmail(event);
                    },
                    filter: function () {
                        return $(this).is(":visible");
                    }
                }
            );
        });
    }

    function checkUniquenessOfEmail(event) {
        var emailSelector = $('#signUpForm .form-group input[type="email"]');
        if (emailSelector.length == 0)
            return;

        $.ajax({
            url: "/signup/checkUniquenessOfEmail",
            data: {email: emailSelector.val()},
            method: "POST",
            async: false,
            headers: {
                accept: "application/json; charset=utf-8"
            },
            success: function (data) {
                if (data.isEmailUnique == true || (data.responseJSON && data.responseJSON.isEmailUnique == true)) {

                } else {
                    event.preventDefault();
                    var emailFormGroupSelector = emailSelector.parents(".form-group");
                    emailFormGroupSelector.addClass("has-error");
                    emailFormGroupSelector.find(".help-block").html("Specified email already in use");
                }
            },
            error: function (e) {
                var error = {message: 'Some error has occurred, please try again'};
                event.preventDefault();
                if (e.statusText) {
                    error.message = e.statusText;
                } else if (e.responseText) {
                    error.message = e.responseText;
                }
                var emailFormGroupSelector = emailSelector.parents(".form-group");
                emailFormGroupSelector.addClass("has-error");
                emailFormGroupSelector.find(".help-block").html(error.message);
            }
        });
        return false;
    }

    /** Pkg Cloud view */
    if ($('#pkgcloud').length > 0) {

        updatePkgCloudInputAvailability();

        $('#pkgcloud select[name="pkgcloudProvider"]').change(function (event) {

            updatePkgCloudInputAvailability();
        });
    }

    function updatePkgCloudInputAvailability() {

        var pkgCloudProvider = $('#pkgcloud select[name="pkgcloudProvider"]').val();

        $('#pkgcloud input[type="text"]').prop('disabled', true);

        if (pkgCloudProvider === 'rackspace') {

            $('#pkgcloud input[name="pkgcloudApiKey"]').prop('disabled', false);
            $('#pkgcloud input[name="pkgcloudUserName"]').prop('disabled', false);
            $('#pkgcloud input[name="pkgcloudRegion"]').prop('disabled', false);

        } else if (pkgCloudProvider === 'azure') {

            $('#pkgcloud input[name="azureAccount"]').prop('disabled', false);
            $('#pkgcloud input[name="azureAccessKey"]').prop('disabled', false);

        } else {

            console.error('nodejs-admin::custom.js: Provider "' + pkgCloudProvider + '" is not supported.');
        }
    }

    /** Pkg Cloud view */
});

// Google analytics code
(function (i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function () {
            (i[r].q = i[r].q || []).push(arguments)
        }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src   = g;
    m.parentNode.insertBefore(a, m)
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-40361841-3', 'auto');
ga('send', 'pageview');


var queryStringHelper = function () {
    function getUpdatedQueryString(originalQueryString, name, value) {
        var queryString = "";
        if (originalQueryString.length == 0)
            queryString = '?' + name + '=' + value;
        else {
            var queryObject   = getQueryObject(originalQueryString);
            queryObject[name] = value;
            queryString       = convertToQueryString(queryObject);
        }
        return queryString;
    }

    function getQueryObject(queryString) {
        var match,
            pl     = /\+/g,  // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function (s) {
                return decodeURIComponent(s.replace(pl, " "));
            },
            queryObject;

        if (queryString.substring(0, 1) === '?')
            queryString = queryString.substring(1);

        queryObject = {};
        while (match = search.exec(queryString))
            queryObject[match[1]] = decode(match[2]);
        //queryObject[decode(match[1])] = decode(match[2]);
        return queryObject;
    }

    function convertToQueryString(queryObject) {
        var queryString = '?';

        $.each(Object.keys(queryObject), function (index, value) {
            queryString += value + '=' + encodeURIComponent(queryObject[value]) + '&'
            //queryString += encodeURIComponent(value) + '='+ encodeURIComponent(queryObject[value]) + '&'
        });
        return queryString.substring(0, queryString.length - 1);
    }

    return {
        getUpdatedQueryString: getUpdatedQueryString
    };
}();

/**
 * Bulk Edit
 */
$(document).ready(function () {
    $('#bulk-edit-form .edit-field > textarea,input').focus(function () {
        var checkbox = $("input[name='" + $(this).attr('name') + "_checkbox']");
        if (checkbox.length) checkbox.prop('checked', true);
    });
    $('#bulk-edit-form .next').click(function () {
        if ($('#bulk-edit-form input[type="checkbox"]:checked').length === 0) {
            return $('#flash-messages-bulk-edit')
                .html('<div class="alert alert-danger"><div>No fields are checked to be edited</div></div>');
        }

        $('#bulk-edit-form form').submit();
    });
});

$(document).ready(function () {
    $('.user-roles-select').select2();
    $('.select2').select2();
    $('.date-range-picker').daterangepicker({
        autoUpdateInput: false,
        locale: {
            cancelLabel: 'Clear'
        }
    });
    $('.date-range-picker').on('apply.daterangepicker', function (ev, picker) {
        $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
    });

    $('.date-range-picker').on('cancel.daterangepicker', function (ev, picker) {
        $(this).val('');
    });

    tinymce.init({selector: '.tinymce'});

    $('.admin-ui-select2-autocomplete').each(function () {

        $(this).select2({
            allowClear: true,
            ajax: {
                url: '/admin/' + $(this).data('resource') + '/autocomplete',
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        'filter[search]': params.term // search term
                    };
                },
                processResults: function (data) {
                    return {
                        results: data.items
                    };
                }
            },
            minimumInputLength: 1
        });
    });
});

$(document).ready(function () {
    var max_fields = 10; //maximum input boxes allowed
    var wrapper    = $(".acl_actions_input_fields_wrap"); //Fields wrapper
    var add_button = $(".acl_actions_add_field_button"); //Add button ID

    var x = 1; //initlal text box count
    $(add_button).click(function (e) { //on add input button click
        e.preventDefault();
        if (x < max_fields) { //max input box allowed
            x++; //text box increment
            $(wrapper).append('<div><input type="text" name="actions[]"/><a href="#" class="remove_field">Remove</a></div>'); //add input box
        }
    });

    $(wrapper).on("click", ".remove_field", function (e) { //user click on remove text
        e.preventDefault();
        $(this).parent('div').remove();
        x--;
    })
});