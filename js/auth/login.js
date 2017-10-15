export default function ($stateProvider) {
    $stateProvider.state('login', {
        url: '/login',
        views: {
            'login': {
                template: require('./login.html'),
                restrict: 'E',
                scope: {},
                controller: [
                    '$scope', '$rootScope', 'Restangular', '$location', '$window', 'notification', '$translate',
                    function ($scope, $rootScope, Restangular, $location, $window, notification, $translate) {
                        $scope.sendLogin = function () {
                            Restangular.all('auth/login').post({
                                "email": $scope.email,
                                "password": $scope.password
                            }).then(profile => {

                                if (profile.data) {
                                    profile = profile.data;
                                }

                                Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + profile.api_token});
                                $window.localStorage.setItem('user_name', profile.user.name)
                                $window.localStorage.setItem('api_token', profile.api_token)

                                $location.path('/dashboard');
                            }, function errorCallback() {
                                notification.log($translate.instant('WRONG_LOGIN'), {addnCls: 'humane-flatty-error'});
                            });
                        }
                    }],
            }
        }
    });
};
