angular.module('settingsApp').config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/profile');

    $stateProvider.state('profile', {
        resolve: {
            getUserActivePic: function (profileService) {
                return profileService.getActiveUserPic().then(function (data) {
                    return data.src;
                }, function (data) {
                    console.log('Error: ' + data);
                    return 'null';
                });
            }
        }
        , url: '/profile'
        , templateUrl: '/static/app/profile/profile.html'
        , controller: 'ProfileController as profileCtrl'
    }).state('addnews', {
        resolve: {
            getNewsCategories: function (newsService) {
                return newsService.getNewsCategories().then(function (data) {
                    console.log('tutaj ' + data[0].categoryname);
                    return data;
                }, function (data) {
                    console.log('Error: ' + data);
                    return null;
                });
            }
            , getRoles: function (newsService) {
                return newsService.getRoles().then(function (data) {
                    console.log('tutaj2');
                    return data;
                }, function (data) {
                    console.log('Error: ' + data);
                    return null;
                });
            }
        }
        , url: '/addnews'
        , templateUrl: '/static/app/news/addnews.html'
        , controller: 'NewsController as newsCtrl'
    }).state('addwar', {
        url: '/addwar'
        , templateUrl: '/static/app/war/addwar.html'
    }).state('adminpanel', {
        url: '/adminpanel'
        , templateUrl: '/static/app/adminpanel/adminpanel.html'
    })
}]);