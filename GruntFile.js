'use strict';

module.exports = function (grunt) {

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);
    // Load grunt tasks automatically
    require('jit-grunt')(grunt);

    // configurable paths
    var config = {
            source: 'src/',
            dist: 'pub/',
            assets: {
                requirejs: {},
                cssmin: {},
                header: {}
            }
        },
        assets = grunt.file.readJSON(config.source + '.assets');

    assets.forEach(function (asset) {
        config.assets.requirejs[asset] = {
            options: {
                baseUrl: '<%= config.source %>js',
                optimize: 'uglify2',
                include: ['requirejs', asset + '-config'],
                mainConfigFile: [
                    '<%= config.source %>js/client/config.js',
                    '<%= config.source %>js/' + asset + '-config.js'
                ],
                out: '<%= config.dist %>js/' + asset + '-body.min.js',
                generateSourceMaps: true,
                preserveLicenseComments: false,
                useStrict: true,
                wrap: true,
                findNestedDependencies: true
            }
        };
        config.assets.cssmin['<%= config.dist %>css/' + asset + '-styles.min.css'] =
            '.tmp/css/' + asset + '-styles.css';
        config.assets.header['<%= config.dist %>js/' + asset + '-header.min.js'] = [
            '<%= config.source %>js/vendors/modernizr/modernizr.js'
        ];
    });

    grunt.initConfig({
        config: config,
        watch: {
            compass: {
                files: ['<%= config.source %>css/**/*.{scss,sass}'],
                tasks: ['compass:server', 'copy:watch']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            }
        },
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= config.dist %>'
                    ]
                }]
            }
        },
        compass: {
            options: {
                sassDir: '<%= config.source %>css',
                cssDir: '.tmp/css',
                specify: assets.map(function (asset) {
                    return '<%= config.source %>css/' + asset + '-styles.scss';
                }),
                generatedImagesDir: '.tmp/imgs/generated',
                imagesDir: '<%= config.source %>imgs',
                javascriptsDir: '<%= config.source %>js',
                importPath: '<%= config.source %>js/vendors',
                httpImagesPath: '../imgs',
                httpGeneratedImagesPath: '../imgs/generated',
                require: ['sass-css-importer'],
                assetCacheBuster: true
            },
            dist: {
                options: {
                    debugInfo: false,
                    generatedImagesDir: '<%= config.dist %>imgs/generated'
                }
            },
            server: {
                options: {
                    debugInfo: false
                }
            }
        },
        browserSync: {
            bsFiles: {
                src : '<%= config.source %>'
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./<%= config.source %>"
                }
            }
        },
        requirejs: config.assets.requirejs,
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>imgs',
                    src: '**/*.{png,jpg,jpeg,gif}',
                    dest: '<%= config.dist %>imgs'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>imgs',
                    src: '**/*.svg',
                    dest: '<%= config.dist %>imgs'
                }]
            }
        },
        cssmin: {
            options: {
            },
            dist:  {
                files: config.assets.cssmin
            }
        },
        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    minifyJS: true,
                    minifyCSS: true
                },
                files: assets.map(function (asset) {
                    return {
                        expand: true,
                        cwd: '<%= config.source %>' + asset + '-templates',
                        src: '**/*.html',
                        dest: '<%= config.dist %>' + asset + '-templates'
                    };
                })
            }
        },
        // Put files not handled in other tasks here
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.source %>',
                        dest: '<%= config.dist %>',
                        src: ['imgs/**/*.{webp}']
                    }
                ]
            },
            styles: {
                expand: true,
                dot: true,
                cwd: '<%= config.source %>css',
                dest: '.tmp/css/',
                src: assets.map(function (asset) {
                    return asset + '-styles.css';
                })
            },
            watch: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '.tmp/imgs/',
                        dest: '<%= config.source %>imgs',
                        src: '**/*.*'
                    }
                ].concat(
                    assets.map(function (asset) {
                        return {
                            expand: true,
                            dot: true,
                            cwd: '.tmp/css/',
                            dest: '<%= config.source %>css',
                            src: asset + '-styles.css'
                        };
                    })
                )
            }
        },
        uglify: {
            header: {
                files: config.assets.header
            }
        },
        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= config.source %>',
                    src: '*.html',
                    dest: '<%= config.dist %>'
                }]
            }
        },
        concurrent: {
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'compass:dist',
        'copy:watch',
        'cssmin',
        'imagemin',
        'requirejs',
        'htmlmin',
        'processhtml',
        'uglify:header',
        'copy:dist'
    ]);

    grunt.registerTask('default', [
        'build'
    ]);
    grunt.registerTask('styles', [
        'compass:server', 'copy:watch'
    ]);

    grunt.registerTask('dev', ['browserSync', 'styles', 'watch']);
};
