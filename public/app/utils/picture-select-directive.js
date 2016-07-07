angular.module('settingsApp').directive('customOnChange', function () {
    return {
        require: 'ngModel'
        , restrict: 'A'
        , scope: {
            customOnChange: '&'
        }
        , link: function ($scope, element, attrs, ngModel) {
            element.bind('change', function (event) {
                ngModel.$setViewValue(event.target.files[0]);
                $scope.$apply(function () {
                    if (event.target.files[0]) {
                        $scope.customOnChange();
                    }
                });
            });

            $scope.$watch(function () {
                return ngModel.$viewValue;
            }, function (value) {
                if (!value) {
                    element.val('');
                }
            });
        }
    };
});