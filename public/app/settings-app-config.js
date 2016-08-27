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
        resolve: {
            getTmoClansArr: function (warService) {
                return warService.getTmoClansArr().then(function (data) {
                    console.log('get membbers');
                    return data;
                }, function (data) {
                    console.log('error get members');
                    return null;
                });
            }
            , getTmoMembers: function (warService) {
                return warService.getTmoMembers().then(function (data) {
                    console.log('get membbers');
                    return data;
                }, function (data) {
                    console.log('error get members');
                    return null;
                });
            }
            , getUsersList: function (warService) {
                return warService.getUsersList().then(function (data) {
                    console.log('get userslist');
                    return data;
                }, function (data) {
                    console.log('error get uesrslist');
                    return null;
                });
            }
        }
        , url: '/addwar'
        , templateUrl: '/static/app/war/addwar.html'
        , controller: 'WarController as warCtrl'
    }).state('adminpanel', {
        url: '/adminpanel'
        , templateUrl: '/static/app/adminpanel/adminpanel.html'
    })
}]);