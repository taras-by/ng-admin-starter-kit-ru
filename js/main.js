var angular = require('angular');

var myApp = angular.module('myApp', [
    require('ng-admin')
]);

var api = require('./api');
myApp.config(['RestangularProvider', api.requestInterceptor]);
myApp.config(['RestangularProvider', api.responseInterceptor]);
myApp.config(['$stateProvider', require('./auth/login')]);
myApp.decorator('HttpErrorService', require('./errors'));

myApp.controller('profileController', [
    '$scope', '$window', '$location', 'Restangular', 'notification', '$translate',
    require('./auth/profileController')
]);
myApp.directive('dashboardSummary', require('./dashboard/dashboardSummary'));

myApp.config(['NgAdminConfigurationProvider', function (nga) {

    var admin = nga.application('Название сайта')
        .baseApiUrl('http://localhost:835/api/');

    // Entities
    require('./user/config')(nga, admin);

    admin.dashboard(require('./dashboard/config')(nga, admin));
    admin.layout(require('./view/layout.html'));

    nga.configure(admin);
}]);

myApp.config(['$translateProvider', function ($translateProvider) {
    $translateProvider.translations('ru', require('./language/ru'));
    $translateProvider.preferredLanguage('ru');
}]);

myApp.run([
    '$window', '$location', 'Restangular', 'notification', '$translate',
    require('./auth/run')
]);
