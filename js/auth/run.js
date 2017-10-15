export default function ($window, $location, Restangular, notification, $translate) {

    var token = $window.localStorage.getItem('api_token');
    if (token) {
        Restangular.setDefaultHeaders({'Authorization': 'Bearer ' + token});
        Restangular.one('profile').get().then(profile => {
            $window.localStorage.setItem('user_name', profile.data.name);
            $location.path('/dashboard');
        }, function errorCallback() {
            $window.localStorage.removeItem('api_token');
            $window.localStorage.removeItem('user_name');
            Restangular.setDefaultHeaders({'Authorization': null});
            notification.log($translate.instant('WRONG_TOKEN'), {addnCls: 'humane-flatty-error'});
            $location.path('/login');
        });
    } else {
        $location.path('/login');
    }
}