angular.module('settingsApp').service('newsService', function ($http, $q) {
    this.getNewsCategories = function () {
        var deferred = $q.defer();
        
        $http({
            method: 'GET'
            , url: '/settings/news/getnewscategories'
        }).then(function(response) {
            if(response.data.categoryname == '-1') {
                deferred.reject('-1');
            } else {
                console.log('service: ' + response.data[0].categoryname);
                deferred.resolve(response.data);
            }
        }, function(response) {
            console.log('Error: ' + response.data);
            deferred.reject('Error: ' + response.data);
        })
        
        return deferred.promise;
    };
    
    this.getRoles = function () {
        var deferred = $q.defer();
        
        $http({
            method: 'GET'
            , url: '/settings/news/getroles'
        }).then(function(response) {
            if(response.data.rolename == '-1') {
                deferred.reject('-1');
            } else {
                console.log('service: ' + response.data);
                deferred.resolve(response.data);
            }
        }, function(response) {
            console.log('Error: ' + response.data);
            deferred.reject('Error: ' + response.data);
        })
        
        return deferred.promise;
    };
});