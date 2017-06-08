angular.module('foxapp')

    .controller('BLEController', ['$scope', '$window','$location', '$cordovaBluetoothSerial',

        function($scope, $window ,$location,$cordovaBluetoothSerial) {
            $scope.notificate = function () {
                $cordovaBluetoothSerial.write('hello world').then(success, failure);
                console.log('notif');

                return 'chibre';
            }

        }]);
