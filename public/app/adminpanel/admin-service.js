angular.module('settingsApp').service('adminService', function ($http, $q) {

    this.getTeamNames = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET'
            , url: '/settings/admin/getteamnames'
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

    this.uploadTeam = function (newTeam) {
        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('teamname', newTeam.teamName);
        fd.append('teamnameshort', newTeam.teamNameShort);
        fd.append('file', newTeam.selectedTeamPic);

        $http({
            method: 'POST'
            , url: '/settings/admin/uploadteam'
            , data: fd
            , transformRequest: angular.identity
            , headers: {
                'Content-Type': undefined
            }
        }).then(function (response) {
            if (response.data == '-1') {
                deferred.reject('server-side error while adding your team..');
            } else {
                deferred.resolve('team was added to database');
            }
        }, function (response) {
            deferred.reject('http error while uploading your team..');
        });

        return deferred.promise;
    };
    
    this.deleteTeam = function (teamName) {
        var deferred = $q.defer();

        /*
        var fd = new FormData();
        fd.append('teamname', teamName);
        */
        
        console.log(teamName);

        $http({
            method: 'DELETE'
            , url: '/settings/admin/removeteam/' + teamName
        }).then(function (response) {
            if (response.data == '-1') {
                deferred.reject('server-side error while removing your team..');
            } else {
                deferred.resolve('team was removed from database');
            }
        }, function (response) {
            deferred.reject('http error while removing your team..');
        });

        return deferred.promise;
    }
});