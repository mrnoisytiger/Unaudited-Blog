module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        cssmin: {
            dist: {
                options: {
                    mergeIntoShorthands: true,
                    mergeMedia: true,
                    removeEmpty: true,
                },
                files: {
                    'public/css/custom-min.css': ['public/css/custom.css']
                }
            }
        },

        concat_css: {
            dist: {
                files: {
                    'public/css/final-min.css': ['public/css/combined-min.css', 'public/css/custom-min.css']
                },
            },
        },

        processhtml: {
            build: {
                options: {
                    process: true,
                },
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['***/**/*.html', '**/*.html', '*.html'],
                    dest: 'public',
                }],
            }, 
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['***/**/*.html', '**/*.html', '*.html'],
                    dest: 'public',
                }],
            },
        },

        imagemin: {
            dist: {
                options: {
                    optimizationLevel: 6
                },
                files: [{
                    expand: true,
                    cwd: 'public/images',
                    src: ['uploads/*.{png,jpg}', '*.{png,jpg}',],
                    dest: 'public/images'
                }],
            }
        },

        uncss: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'public',
                    src: ['***/**/*.html', '**/*.html', '*.html', '!admin/*.html'],
                    dest: 'public/css',
                }]
            }
        },

        shell: {
            dist: {
                command: 'find public/css/ -not -name "*css" -print0 | xargs -0 rm -rf --'
            }
        },

        pagespeed: {
            dist: {
                options: {
                    nokey: true,
                    url: "https://unaudited.felixjen.com/",
                    locale: "en_US",
                    strategy: "desktop",
                    threshold: 70
                },
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-uncss');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-pagespeed');

    grunt.registerTask('default',['cssmin','concat_css','processhtml','htmlmin','imagemin','uncss','shell','pagespeed']);
    
};