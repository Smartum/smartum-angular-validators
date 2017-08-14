module.exports = function (config) {
    config.set({
        files: [
            'test-main.js',
            { pattern: 'dist/**/*.js', included: false },
            { pattern: 'dist/**/*.map', included: false },
            { pattern: 'src/**/*.js', included: false },
            { pattern: 'bower_components/**/*.js', included: false },
            { pattern: 'bower_components/**/*.map', included: false }
        ],
        exclude: [
            'bower_components/**/*spec.js'
        ],

        browsers: ['PhantomJS'],
        // Chrome, ChromeCanary, Firefox, IE (only Windows), Opera, PhantomJS, Safari (only Mac)

        reporters: [
            'dots'
        ],

        preprocessors: {
            // 'source/js/modules/**/*.js': 'coverage',
        },

        /*
        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },
        */

        basePath: './',
        captureTimeout: 60000,
        colors: true,
        frameworks: ['jasmine', 'requirejs'],
        logLevel: config.LOG_INFO,
        port: 9876,
        reportSlowerThan: 500,
        runnerPort: 9100
    });
};
