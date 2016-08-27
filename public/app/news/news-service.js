angular.module('settingsApp').service('newsService', function ($http, $q) {
    this.getNewsCategories = function () {
        var deferred = $q.defer();

        $http({
            method: 'GET'
            , url: '/settings/news/getnewscategories'
        }).then(function (response) {
            if (response.data.categoryname == '-1') {
                deferred.reject('-1');
            } else {
                console.log('service: ' + response.data[0].categoryname);
                deferred.resolve(response.data);
            }
        }, function (response) {
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
        }).then(function (response) {
            if (response.data.rolename == '-1') {
                deferred.reject('-1');
            } else {
                console.log('service: ' + response.data);
                deferred.resolve(response.data);
            }
        }, function (response) {
            console.log('Error: ' + response.data);
            deferred.reject('Error: ' + response.data);
        })

        return deferred.promise;
    };

    this.uploadNews = function (news) {
        var deferred = $q.defer();

        var fd = new FormData();
        fd.append('file', news.selectedPic);
        fd.append('newstitle', news.title);
        fd.append('newscategory', news.category.categoryname);
        fd.append('newsvisibility', news.role.rolename);
        fd.append('newscontent', news.content);

        $http({
            method: 'POST'
            , url: '/settings/news/uploadnews'
            , data: fd
            , transformRequest: angular.identity
            , headers: {
                'Content-Type': undefined
            }
        }).then(function (response) {
            if (response.data == '-1') {
                deferred.reject('server-side error while adding your news..');
            } else {
                deferred.resolve('Your news was added successfuly.')
            }
        }, function (response) {
            deferred.reject('http error while uploading your news..');
        });

        return deferred.promise;
    };
});