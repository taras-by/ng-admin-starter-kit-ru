function dashboardSummary(Restangular, $location, $window) {
    'use strict';

    if(!$window.localStorage.getItem('api_token')){
        $location.path('/login');
    }else{
        return {
            restrict: 'E',
            scope: {},
            controller: ['$scope', function($scope) {
                $scope.stats = {};
                $scope.has_seen_alert = has_seen_alert;
                $scope.dismissAlert = () => {
                    has_seen_alert = true;
                    $scope.has_seen_alert = true;
                };

                Restangular.one('dashboard').get().then(dashboard => {
                    $scope.stats = dashboard.data;
                }, function errorCallback() {
                    $location.path('/login');
                });

            }],
            template: dashboardSummaryTemplate
        };
    }
}
import dashboardSummaryTemplate from './dashboardSummary.html';

var has_seen_alert = false;

dashboardSummary.$inject = ['Restangular', '$location', '$window'];

export default dashboardSummary;
