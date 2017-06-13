angular.module('foxapp')

.controller('GMapController', ['$scope', '$interval','$window','$location', '$cordovaVibration','GeolocationService' ,'NgMap', 'MarkerService', 'SmartWatchService','RESTService','$ionicPopup',

  function($scope, $interval, $window ,$location, $cordovaVibration, GeolocationService, NgMap, MarkerService, SmartWatchService, RESTService , $ionicPopup) {

    // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMBQQC143VTbPWjLWEBJfB3LSzD0LnPw";
    // console.log(MarkerService.getMarkers());

    $scope.GPSTrace = [];

    $scope.foxMarkers = MarkerService.getMarkers();

    $scope.getAllMarkers = function() {
      MarkerService.getAllMarkers().then(function(data) {
        $scope.foxMarkers = data;
      });
    };


    $scope.getAllMarkers();

    $scope.getGPSPosition = function(posOptions) {
      return GeolocationService.getCurrentPosition(posOptions);
    };

    $scope.center = function() {
      var posOptions = [];

      $scope.getGPSPosition(posOptions).then( function(coords){

        $scope.position = coords;
      }, function (err) {

      });
    };


    $scope.center();

    $scope.savePosition = function(){
      var posOptions = [];
      $scope.getGPSPosition(posOptions).then( function(coords){
        $scope.position = coords;
        $scope.GPSTrace.push(
          [coords.lat, coords.lng]
        )
      });
    };

    $scope.checkProximity = true;

    $scope.notifyProximity = function(){
      if($scope.checkProximity) {
        var triggerDistance = 0.15;
        var dangerThreshold = 250;

        $scope.getGPSPosition([]).then( function(coords){
          for(var mrk in $scope.foxMarkers){
            if(GeolocationService.getDistanceFromLatLonInKm(coords.lat, coords.lng, $scope.foxMarkers[mrk].coords.latitude, $scope.foxMarkers[mrk].coords.longitude) <= triggerDistance){
                $cordovaVibration.vibrate(100);
                $scope.foxMarkers[mrk].dangerzone >= dangerThreshold ? SmartWatchService.notificate(SmartWatchService.getDanger()) : SmartWatchService.notificate(SmartWatchService.getProximity());
              break;
            }
          }
        });

      }
    };

    $interval($scope.savePosition, 15000);
    $interval($scope.notifyProximity, 5000);


    $scope.tinderise = function(){
      $scope.tinderswitch = false;
    };

    $scope.addPOI = function(){
      $scope.creationPOI = !$scope.creationPOI;
    };

    $scope.swipeend = function(){
      $scope.tinderswitch = true;
    };

    $scope.tinderswitch = true;

    $scope.creationPOI = true;

    $scope.URL = {
      "plantinder": "http://ns388671.ip-176-31-254.eu/api/planders",
      "poi": "http://ns388671.ip-176-31-254.eu/api/poi",
      "planders" : "http://ns388671.ip-176-31-254.eu/api/planders/result/"
    };

    $scope.recognizePlant = function(promise){
      promise.then(
        function(data){
          var json = JSON.parse(data);
          console.log("been there");
          RESTService.get($scope.URL.planders+json._id).then(
            function(result){
              var jsson = JSON.parse(result);

              $scope.answerder = jsson.results[0].name;

              var myPopup = $ionicPopup.show({
                template: '<input type = "text" ng-model = "answerder">',
                title: 'Résultat',
                subTitle: 'Plander',
                scope: $scope,

                buttons: [
                  { text: 'Cancel' }, {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {

                      if (!$scope.data.model) {
                        //don't allow the user to close unless he enters model...
                        e.preventDefault();
                      } else {
                        return $scope.data.model;
                      }
                    }
                  }
                ]
              });

            }
          );
        }
      );
    };


    $scope.category = "";

    $scope.changeFilter = function(criteria){
      $scope.category = criteria;
    };

    // Shows the informations of the marker once you clicked on it
    $scope.showDetail = function(e, poi) {
      $scope.poi = poi;
      $scope.map.showInfoWindow('foo-iw', poi._id);
    };

    $scope.hideDetail = function() {
      $scope.map.hideInfoWindow('foo-iw');
    };

}]);
