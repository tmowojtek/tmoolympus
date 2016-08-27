angular.module('settingsApp').controller('ProfileController', ['$scope', 'fileReaderFactory', 'getUserActivePic', 'profileService', function ($scope, fileReaderFactory, getUserActivePic, profileService) {
    var self = this;

    self.selectedPic = null;
    self.selectedPicSrc = null;
    self.errorMsg = null;
    self.successMsg = null;
    self.activeUserPic = getUserActivePic;

    self.loadPreviewPictureOnChange = function () {
        fileReaderFactory.readAsDataURL(self.selectedPic, $scope).then(function (result) {
            self.selectedPicSrc = result;
        });
    };

    self.resetSelectedPic = function () {
        self.selectedPic = null;
        self.selectedPicSrc = null;
    };

    self.updatePic = function () {
        if (self.selectedPic) {
            profileService.updateUserPic(self.selectedPic).then(function (data) {
                if (data.src == -1) {
                    self.errorMsg = 'Couldn\'t update your new picture, try again!';
                    self.successMsg = null;
                } else if (data == 'testCATCHpost') {
                    self.errorMsg = 'Unknown request?@!#$';
                    self.successMsg = null;
                } else {
                    self.successMsg = 'Your picture is updated!';
                    self.errorMsg = null;
                    self.activeUserPic = data.src;
                }
                self.resetSelectedPic();
            }, function (data) {
                self.errorMsg = 'Something went wrong..';
                self.successMsg = null;
                console.log(data);
            });
        } else {
            self.errorMsg = 'First select an image!';
            self.successMsg = null;
        }
    };

    self.getActiveUserPic = function () {
        profileService.getActiveUserPic().then(function (data) {
            self.activeUserPic = data.src;
        }, function (data) {
            self.activeUserPic = 'null';
            console.log(data);
        });
    }

    self.resetPic = function () {
        profileService.resetUserPic().then(function (data) {
            if (data.message == '-1') {
                self.errorMsg = 'Try again later..';
                self.successMsg = null;
            } else {
                self.successMsg = data.message;
                self.activeUserPic = data.src;
                self.errorMsg = null;
            }
        }, function (data) {
            self.successMsg = null;
            self.errorMsg = 'Ups, smth went wrong?!';
        });
        //self.getActiveUserPic();
        self.resetSelectedPic();
    };
}]);