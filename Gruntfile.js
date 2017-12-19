module.exports = function (grunt) {

    grunt.initConfig({
        uglify: {
            site_custom_js: {
                options: {
                    beautify: false,
                    preserveComments: false
                },
                files: {
                    './app/assets/javascripts/build.min.js': [
                        './resources/javascripts/jqBootstrapValidation-1.3.7-customized.js',
                        './resources/javascripts/custom.js'
                    ]
                }
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: [
                    './resources/javascripts/chain/jquery-1.11.1.min.js',
                    './resources/javascripts/chain/jquery-migrate-1.2.1.min.js',
                    './resources/javascripts/chain/jquery-ui-1.10.3.min.js',
                    './resources/javascripts/chain/bootstrap.min.js',
                    './resources/javascripts/chain/modernizr.min.js',
                    './resources/javascripts/chain/pace.min.js',
                    './node_modules/moment/moment.js',
                    './resources/javascripts/chain/retina.min.js',
                    './resources/javascripts/chain/select2.full.min.js',
                    './resources/javascripts/chain/jquery.cookies.js',
                    './resources/javascripts/chain/bootstrap-timepicker.min.js',
                    './resources/javascripts/chain/wysihtml5-0.3.0.min.js',
                    './resources/javascripts/chain/bootstrap-wysihtml5.js',
                    './node_modules/bootstrap-daterangepicker/daterangepicker.js',
                    './node_modules/tinymce/tinymce.js',
                    './node_modules/tinymce/themes/modern/theme.js',
                    './app/assets/javascripts/build.min.js'
                ],
                dest: './app/assets/javascripts/build.min.js'
            },
            respond_html5shiv: {
                src: [
                    './resources/javascripts/chain/respond.min.js',
                    './resources/javascripts/chain/html5shiv.js'
                ],
                dest: './app/assets/javascripts/build_lt_ie_9_js.min.js'
            }
        },
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    './app/assets/stylesheets/build.min.css': [
                        './resources/stylesheets/chain/style.default.css',
                        './resources/stylesheets/bootstrap-override.css',
                        './resources/stylesheets/chain/bootstrap-wysihtml5.css',
                        './resources/stylesheets/chain/bootstrap-timepicker.min.css',
                        './resources/stylesheets/chain/select2.min.css',
                        './resources/stylesheets/chain/select2-bootstrap.css',
                        './node_modules/bootstrap-daterangepicker/daterangepicker.css',
                        './node_modules/font-awesome/css/font-awesome.css',
                        './resources/stylesheets/custom.css'
                    ]
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['./node_modules/font-awesome/fonts/*',
                            './node_modules/bootstrap/fonts/*'],
                        dest: './app/assets/fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        flatten: true,
                        src: ['./node_modules/tinymce/skins/lightgray/fonts/*'],
                        dest: './app/assets/stylesheets/fonts/',
                        filter: 'isFile'
                    },
                    {
                        expand: true,
                        cwd: './node_modules/tinymce/plugins/',
                        src: ['**'],
                        dest: './app/assets/javascripts/plugins/'
                    }
                ]
            },
            ckeditor: {
                expand: true,
                cwd: './resources/vendor/ckeditor/',
                src: ['**'],
                dest: './app/assets/javascripts/ckeditor/'
            },
            tinymce_skins: {
                expand: true,
                cwd: './node_modules/tinymce/skins',
                src: ['**'],
                dest: './app/assets/javascripts/skins'
            }
            // {expand: true, cwd: 'path/', src: ['**'], dest: 'dest/'},
        },
        clean: ['./resources/tmp']
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['uglify', 'concat', 'cssmin', 'copy', 'clean']);
};
