/**
 * Created by Nicaedin on 2017/07/24.
 */

angular.module("myApp",[]);

angular.module("myApp").controller("myVm", function($scope, $timeout) {
    var vm = $scope;
    var $http = { post:   () => $timeout(angular.identity,2000),
        delete: () => $timeout(angular.identity,2000)
};

    vm.quantity = 10;
    vm.wait = false;

    vm.increase = function() {
        vm.wait = true;
        $http.post("url").then( function(response) {
            vm.quantity++;
            vm.wait = false;
        }).catch( function(errorResponse) {
            vm.wait = false;
            throw errorResponse;
        });
    };

    vm.decrease = function() {
        vm.wait = true;
        $http.delete("url").then( function(response) {
            vm.quantity--;
            vm.wait = false;
        }).catch( function(errorResponse) {
            vm.wait = false;
            throw errorResponse;
        });
    };
});
