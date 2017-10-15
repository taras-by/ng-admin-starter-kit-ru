export default function ($scope, $window, $location, Restangular, notification, $translate) {
    $scope.username = $window.localStorage.getItem('user_name');
    $scope.logout = function () {
        $window.localStorage.removeItem('api_token');
        $window.localStorage.removeItem('user_name');
        Restangular.setDefaultHeaders({'Authorization': null});
        notification.log($translate.instant('GOODBUY'), {addnCls: 'humane-flatty-success'});
        $location.path('/login');
    }
}