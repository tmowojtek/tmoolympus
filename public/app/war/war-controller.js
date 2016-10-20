angular.module('settingsApp').controller('WarController', ['$scope', 'fileReaderFactory', 'warService', 'getTmoMembers', 'getUsersList', 'getTmoClansArr', function ($scope, fileReaderFactory, warService, getTmoMembers, getUsersList, getTmoClansArr) {
    var self = this;

    self.tmoClansArr = getTmoClansArr;
    self.tmoMembers = getTmoMembers;
    self.usersList = getUsersList;

    self.tmoMembersArr = [];

    self.selectedPicsSrcArr = [];

    self.errorMsg = null;
    self.successMsg = null;
    self.opponentError = null;
    self.tmoLineUpError = null;
    self.enemyLineUpError = null;
    self.mapsPlayedError = null;
    self.partialScoresError = null;
    self.anyScreensError = null;
    self.matchReportError = null;

    self.addWarBtnIsDisabled = false;

    self.mapList = ['carentan', 'dawnville', 'brecourt', 'tigertown', 'neuville', 'depot', 'chateau', 'hurtgen', 'railyard', 'rocket', 'ship', 'harbor', 'bocage', 'stalingrad', 'german_town', 'powcamp', 'pavlov'];
    self.possibleMvp = [];

    // post war details parameters
    self.opponentClanName = null;
    self.tmoLineUp = [];
    self.opponentLineUp = [];
    self.mapsPlayed = [];
    self.warResults = [];
    self.warImages = [];
    self.selectedMvp = null;
    self.warReport = null;

    self.updateSelectedOpponentClan = function () {
        if ($scope.selectedClan) {
            $scope.typedClan = null;
            self.opponentClanName = $scope.selectedClan.teamname;
        } else {
            self.opponentClanName = null;
        }
    };

    self.updateTypedOpponentClan = function () {
        if ($scope.typedClan != null) {
            if ($scope.typedClan.trim().length > 0) {
                $scope.selectedClan = null;
                self.opponentClanName = $scope.typedClan;
            } else {
                self.opponentClanName = null;
            }
        } else {
            self.opponentClanName = null;
        }
    };

    self.addSub = function (sub) {
        if (sub) {
            if (sub.trim().length > 0) {
                self.tmoLineUp.push(sub);
                $scope.sub = null;
                $scope.clanmember = null;
                $scope.siteUserTmoSub = null;
                self.setPossibleMvps();
            }
        }
    };

    self.removeSub = function (index) {
        var name = self.tmoLineUp[index];
        self.tmoLineUp.splice(index, 1);
        self.removePossibleMvp(name);
    };

    self.addOpponent = function (opponent) {
        if (opponent) {
            if (opponent.trim().length > 0) {
                self.opponentLineUp.push(opponent);
                $scope.selectedUser = null;
                $scope.typedOpponent = null;
                self.setPossibleMvps();
            }
        }
    };

    self.addOpponentOb = function (opponent) {
        if (opponent) {
            if (opponent.tag.trim().length > 0) {
                self.opponentLineUp.push(opponent.tag);
                $scope.selectedUser = null;
                $scope.typedOpponent = null;
                self.setPossibleMvps();
            }
        }
    };

    self.removeOpponent = function (index) {
        var name = self.opponentLineUp[index];
        self.opponentLineUp.splice(index, 1);
        self.removePossibleMvp(name);
    };

    self.createTmoMembersArray = function () {
        self.tmoMembers.members.forEach(function (el) {
            self.tmoMembersArr.push(el.tag);
        });
        self.tmoMembers.leaders.forEach(function (el) {
            self.tmoMembersArr.push(el.tag);
        });
    };

    self.addPartialScore = function (our, their) {
        if (our >= 0 && their >= 0) {
            self.warResults.push({
                our: our
                , their: their
            });
            $scope.our = null;
            $scope.their = null;
        }
    };

    self.removePartialScore = function (index) {
        self.warResults.splice(index, 1);
    };

    self.addPlayedMap = function (map) {
        if (map) {
            self.mapsPlayed.push(map);
            $scope.selectedMap = null;
        }
    };

    self.removePlayedMap = function (index) {
        self.mapsPlayed.splice(index, 1);
    };

    self.addImageDialogBox = function () {
        if (self.warImages.length < 10) {
            self.warImages.push({
                file: ''
            });
        }
    };

    self.removeWarImageDialogBox = function (index) {
        self.warImages.splice(index, 1);
    };

    self.setPossibleMvps = function () {
        self.tmoLineUp.forEach(function (item) {
            if (self.possibleMvp.indexOf(item) == -1) {
                self.possibleMvp.push(item);
            }
        });

        self.opponentLineUp.forEach(function (item) {
            if (self.possibleMvp.indexOf(item) == -1) {
                self.possibleMvp.push(item);
            }
        });
    };

    self.removePossibleMvp = function (name) {
        var ind = self.possibleMvp.indexOf(name);
        if (ind != -1) {
            self.possibleMvp.splice(ind, 1);
            self.setPossibleMvps();
        }
    };

    self.postWar = function () {
        self.addWarBtnIsDisabled = true;

        self.errorMsg = null;
        self.successMsg = null;
        self.opponentError = null;
        self.tmoLineUpError = null;
        self.enemyLineUpError = null;
        self.mapsPlayedError = null;
        self.partialScoresError = null;
        self.anyScreensError = null;
        self.matchReportError = null;

        if (!self.opponentClanName || self.opponentClanName.trim() == '') {
            self.opponentError = 'who did u play against?';
        }
        if (self.tmoLineUp.length == 0) {
            self.tmoLineUpError = 'add at least one our member :|';
        }
        if (self.opponentLineUp.length == 0) {
            self.enemyLineUpError = 'no one was up against us?';
        }
        if (self.mapsPlayed.length == 0) {
            self.mapsPlayedError = 'were you hidding behind cow somewhere?';
        }
        if (self.warResults.length == 0) {
            self.partialScoresError = 'no ac, gg bb 4:0'
        }
        if (self.warImages.length > 0) {
            for (let el of self.warImages) {
                if (!el.file) {
                    self.anyScreensError = 'if you chose to add a screen, add it, otherwise remove - picture or didn\'t happen!';
                    break;
                }
            }
        }
        if (!self.warReport || self.warReport.trim().length < 3) {
            self.matchReportError = 'Was it a ZeKe war? type at least 3 chars..';
        }
        if (!self.opponentError &&
            !self.tmoLineUpError &&
            !self.enemyLineUpError &&
            !self.mapsPlayedError &&
            !self.partialScoresError &&
            !self.anyScreensError &&
            !self.matchReportError) {

            var warToPost = {};

            warToPost.opponentName = self.opponentClanName;
            warToPost.tmoLineUp = self.tmoLineUp;
            warToPost.opponentLineUp = self.opponentLineUp;
            warToPost.mapsPlayed = self.mapsPlayed;
            warToPost.warResults = self.warResults;
            warToPost.warImages = self.warImages;
            warToPost.warMvp = self.selectedMvp;
            warToPost.warReport = self.warReport;

            warService.uploadWar(warToPost).then(function (data) {
                self.successMsg = data;

                $scope.typedClan = null;
                $scope.selectedClan = null;
                self.opponentClanName = null;
                self.tmoLineUp = [];
                self.opponentLineUp = [];
                self.mapsPlayed = [];
                self.warResults = [];
                self.warImages = [];
                self.selectedMvp = null;
                self.possibleMvp = [];
                self.warReport = null;

                self.addWarBtnIsDisabled = false;
            }, function (data) {
                self.errorMsg = data;

                self.addWarBtnIsDisabled = false;
            });
        } else {
            self.addWarBtnIsDisabled = false;
        }
    };

    self.createTmoMembersArray();
}]);