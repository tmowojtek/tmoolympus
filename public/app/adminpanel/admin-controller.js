angular.module('settingsApp').controller('AdminController', ['$scope', 'fileReaderFactory', 'adminService', 'getTeamNames', function ($scope, fileReaderFactory, adminService, getTeamNames) {
    var self = this;

    self.teamNamesArr = getTeamNames;

    self.clearErrorMsgs = function () {
        self.successAddTeamMsg = null;
        self.errorAddTeamMsg = null;
        self.addTeamError = null;
        self.successRemoveTeamMsg = null;
        self.errorRemoveTeamMsg = null;
        self.removeTeamError = null;
    }

    self.teamName = null;
    self.teamNameShort = null;
    self.selectedTeamPic = null;
    self.selectedTeamPicSrc = null;

    self.disableButtons = function () {
        self.addTeamBtnIsDisabled = true;
        self.removeTeamBtnIsDisabled = true;
    };

    self.enableButtons = function () {
        self.addTeamBtnIsDisabled = false;
        self.removeTeamBtnIsDisabled = false;
    };

    self.enableButtons();

    self.loadPreviewPictureOnChange = function () {
        fileReaderFactory.readAsDataURL(self.selectedTeamPic, $scope).then(function (result) {
            self.selectedTeamPicSrc = result;
        });
    };


    self.addTeam = function () {
        self.disableButtons();

        self.clearErrorMsgs();

        if (!self.teamName || self.teamName.trim() == '') {
            self.addTeamError += ' empty teamname;';
        }
        if (!self.teamNameShort || self.teamNameShort.trim() == '') {
            self.addTeamError += ' empty teamnameshort min. 1 max. 6 chars;';
        }
        if (!self.selectedTeamPic) {
            self.addTeamError += ' select pic;';
        }

        if (!self.addTeamError) {

            var newTeam = {};
            newTeam.teamName = self.teamName;
            newTeam.teamNameShort = self.teamNameShort;
            newTeam.selectedTeamPic = self.selectedTeamPic;

            adminService.uploadTeam(newTeam).then(function (data) {
                self.successAddTeamMsg = data;

                self.teamName = null;
                self.teamNameShort = null;
                self.selectedTeamPic = null;

                adminService.getTeamNames().then(function (data) {
                    self.teamNamesArr = data
                }, function (data) {});

                self.enableButtons();
            }, function (data) {
                self.errorAddTeamMsg = data;

                self.enableButtons();
            })
        } else {
            self.enableButtons();
        }
    };

    self.removeTeam = function () {
        self.disableButtons();

        self.clearErrorMsgs();


        if (!$scope.selectedRemoveTeamName) {
            self.removeTeamError = 'please select team to remove';
        }

        if (!self.removeTeamError) {
            var teamName = $scope.selectedRemoveTeamName.teamname;
            if (confirm('Do you really want to delete '+ teamName +'?')) {
               console.log($scope.selectedRemoveTeamName);
                adminService.deleteTeam(teamName).then(function (data) {
                    self.successRemoveTeamMsg = data;

                    adminService.getTeamNames().then(function (data) {
                        self.teamNamesArr = data
                    }, function (data) {})

                    self.enableButtons();
                }, function (data) {
                    self.errorRemoveTeamMsg = data;

                    self.enableButtons();
                });
            } else {
                console.log('refused to delete team');
                self.enableButtons();
            }
        } else {
            self.enableButtons();
        }

    }

}]);