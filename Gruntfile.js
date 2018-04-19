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
    });

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-concat-css');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    grunt.registerTask('default',['cssmin','concat_css','processhtml','htmlmin']);
    
};