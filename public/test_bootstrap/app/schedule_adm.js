var scheduleApp = angular.module('schedule', ['restangular' /*, 'ui.bootstrap'*/ ]);

scheduleApp.config(function (RestangularProvider) {
    RestangularProvider.setBaseUrl('https://testyaas-tmowebpage.rhcloud.com');
});

scheduleApp.controller('ScheduleController', function ($scope, Restangular) {

    $scope.transformedSchedule = {};
    $scope.helper = 0;

    Restangular.all('getscheduleadm').getList().then(function (response) {
        $scope.schedule = Restangular.stripRestangular(response);

        $scope.schedule.forEach(function(element, index){
            if(index%4 == 0) {
                $scope.helper++;
                $scope.transformedSchedule[$scope.helper] = [];
            }
            $scope.transformedSchedule[$scope.helper].push(element);
        });
    });

});