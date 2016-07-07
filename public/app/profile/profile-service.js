angular.module('settingsApp').service('profileService', function ($http, $q) {
    this.updateUserPic = function (fileIn) {
        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('file', fileIn);

        $http({
            method: 'POST'
            , url: '/settings/user/updatepic'
            , data: fd
            , transformRequest: angular.identity
            , headers: {
                'Content-Type': undefined
            }
        }).then(function (response) {
            deferred.resolve(response.data);
        }, function (response) {
            console.log('Error: ' + response.data);
            deferred.reject('Error: ' + response.data);
        });
        
        return deferred.promise;
    };

    this.resetUserPic = function () {
        var deferred = $q.defer();
        
        $http({
            method: 'GET'
            , url: '/settings/user/resetpic'
        }).then(function(response) {
            deferred.resolve(response.data);
        }, function(response) {
            console.log('Error: ' + response.data);
            deferred.reject('null');
        }); 
        
        return deferred.promise;
    };

    this.getActiveUserPic = function () {
        var deferred = $q.defer();
        
        $http({
            method: 'GET'
            , url: '/settings/user/activepic'
        }).then(function(response) {
            deferred.resolve(response.data);
        }, function(response) {
            console.log('Error: ' + response.data);
            deferred.reject('null');
        }); 
        
        return deferred.promise;
    };
})