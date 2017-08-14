module.exports = function (grunt) {
    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        lifecycle: {
            validate: [
                'jshint'
            ],
            compile: [],
            'package': [
                'concat',
                'uglify'
            ],
            'integration-test': [],
            verify: [],
            install: [],
            deploy: []
        },

        jshint: {
            src: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['dist/**/*.js', 'examples/**/*.js', '!**/*.min.js']
            },
            tests: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                src: ['src/**/*.spec.js']
            },
            grunt: {
                options: {
                    jshintrc: '.jshintrc'
                },
                src: ['Gruntfile.js']
            }
        },

        concat: {
            options: {
                banner: [
                    '/**',
                    ' * <%= pkg.name %> v<%= grunt.file.readJSON("package.json").version %>',
                    " */\n\n"
                ].join('\n')
            },
            scripts: {
                src: [
                    'src/wrap.start',
                    'src/module.js',
                    'src/businessId.js',
                    'src/ssn.js',
                    'src/iban.js',
                    'src/phone.js',
                    'src/wrap.end'
                ],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        jsbeautifier: {
            files : ["dist/smartum-angular-validators.js"],
            options : {
            }
        },

        uglify: {
            options: {
                sourceMap : true,
                sourceMapIncludeSources : true,
                banner: [
                    '/** ',
                    ' * <%= pkg.name %> v<%= grunt.file.readJSON("package.json").version %>',
                    " */\n\n"
                ].join('\n')
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.scripts.dest %>']
                }
            }
        },

        bump: {
            options: {
                files: ['package.json', '.bower.json'],
                updateConfigs: [],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: [
                    'package.json',
                    '.bower.json',
                    'CHANGELOG.md',
                    'dist/smartum-angular-validators.js',
                    'dist/smartum-angular-validators.min.js',
                    'dist/smartum-angular-validators.min.js.map'
                ],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        }
    });

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.registerTask('build', ['concat', 'jsbeautifier', 'uglify', 'jshint']);
    grunt.registerTask('release', ['bump-only:minor', 'build', 'bump-commit']);
    grunt.registerTask('release-patch', ['bump-only:patch', 'build', 'bump-commit']);
    grunt.registerTask('default', ['build']);
};
