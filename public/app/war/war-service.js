angular.module('settingsApp').service('warService', function ($http, $q) {

    this.getTmoClansArr = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET'
            , url: '/settings/war/gettmoclans'
        }).then(function (response) {
            if (response.data == '-1') {
                deferred.reject('error from server');
            } else {
                deferred.resolve(response.data);
            }
        }, function (response) {
            console.log('Error: ' + response.data);
            deferred.reject('error http request');
        });

        return deferred.promise;
    };

    this.getTmoMembers = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET'
            , url: '/settings/war/gettmomembers'
        }).then(function (response) {
            if (response.data == '-1') {
                deferred.reject('error from server');
            } else {
                deferred.resolve(response.data);
            }
        }, function (response) {
            console.log('Error: ' + response.data);
            deferred.reject('error http request');
        });

        return deferred.promise;
    };

    this.getUsersList = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET'
            , url: '/settings/war/getuserslist'
        }).then(function (response) {
            if (response.data == '-1') {
                deferred.reject('error from server');
            } else {
                deferred.resolve(response.data);
            }
        }, function (response) {
            console.log('Error: ' + response.data);
            deferred.reject('error http request');
        });

        return deferred.promise;
    };

    this.uploadWar = function (war) {
        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('opponentName', war.opponentName);
        for (let el of war.tmoLineUp) {
            fd.append('tmoLineUp', el);
        }
        for (let el of war.opponentLineUp) {
            fd.append('opponentLineUp', el);
        }
        for (let el of war.mapsPlayed) {
            fd.append('mapsPlayed', el);
        }
        for (let el of war.warResults) {
            //fd.append('warResults', el);
            fd.append('our', el.our);
            fd.append('their', el.their);
        }
        for (let el of war.warImages) {
            fd.append('file', el.file);
        }
        fd.append('warMvp', war.warMvp);
        fd.append('warReport', war.warReport);

        $http({
            method: 'POST'
            , url: '/settings/war/uploadwar'
            , data: fd
            , transformRequest: angular.identity
            , headers: {
                'Content-Type': undefined
            }
        }).then(function (response) {
            if (response.data == '-1') {
                deferred.reject('server-side error while adding your war..');
            } else {
                deferred.resolve('war was added to database');
            }
        }, function (response) {
            deferred.reject('http error while uploading your news..');
        });

        return deferred.promise;
    }
});