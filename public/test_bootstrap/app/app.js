var leagueApp = angular.module('league', ['restangular' /*, 'ui.bootstrap'*/ ]);

leagueApp.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('https://testyaas-tmowebpage.rhcloud.com');
});

leagueApp.controller('LeagueController', function ($scope, Restangular) {
    $scope.test = 'halohalo';

    Restangular.all('gettable').getList().then(function (response) {
        $scope.table = Restangular.stripRestangular(response)
    });

    Restangular.all('getmatchweek').getList().then(function (response) {
        $scope.thisWeekMatches = Restangular.stripRestangular(response)
        $scope.matchWeek = $scope.thisWeekMatches[0].week_round;
        $scope.matchWeekDateFrom = $scope.thisWeekMatches[0].date_from;
        $scope.matchWeekDateTo = $scope.thisWeekMatches[0].date_to;
        $scope.matchWeekDateFrom = $scope.matchWeekDateFrom.replace(/\-/g, '.');
        $scope.matchWeekDateTo = $scope.matchWeekDateTo.replace(/\-/g, '.');
    });
});