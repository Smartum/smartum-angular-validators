(function (global) {
    var fileWithoutLeadingSlash;

    global.tests = [];

    for (var file in global.__karma__.files) {
        if (global.__karma__.files.hasOwnProperty(file)) {
            fileWithoutLeadingSlash = file.replace(/^\//, '');
            global.__karma__.files[fileWithoutLeadingSlash] = global.__karma__.files[file];

            delete global.__karma__.files[file];

            if (/spec\.js$/.test(fileWithoutLeadingSlash)) {
                global.tests.push(fileWithoutLeadingSlash);
            }
        }
    }
})(this);

require.config({
    baseUrl: 'base/src',

    deps: window.tests,
    callback: window.__karma__.start,

    paths: {
        angular: '../bower_components/angular/angular.min',
        'angular.mocks': '../bower_components/angular-mocks/angular-mocks',
        'angular.messages': '../bower_components/angular-messages/angular-messages.min',
        moment: '../bower_components/moment/min/moment.min',
        jquery: '../bower_components/jquery/dist/jquery.min',
        smartumValidators: '../dist/smartum-angular-validators.min'
    },

    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular.messages': ['angular'],
        'angular.mocks': ['angular']
    }
});
