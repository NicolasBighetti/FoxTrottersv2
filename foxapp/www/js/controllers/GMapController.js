angular.module('foxapp')

.controller('GMapController', ['$scope', '$interval','$window','$location', '$cordovaVibration', 'GeolocationService',
  'NgMap', 'MarkerService', 'SmartWatchService','RESTService','$ionicPopup','$ionicSlideBoxDelegate',

  function($scope, $interval, $window ,$location, $cordovaVibration, GeolocationService, NgMap, MarkerService,
           SmartWatchService, RESTService , $ionicPopup, $ionicSlideBoxDelegate) {

    // $scope.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=AIzaSyAGMBQQC143VTbPWjLWEBJfB3LSzD0LnPw";
    // console.log(MarkerService.getMarkers());
    console.log('dbPath');
    console.log(dbPath);

    $scope.dbPath = dbPath;

    $scope.disableSwipe = function(){
        $ionicSlideBoxDelegate.enableSlide(false);
    };

    $scope.enableSwipe = function(){
        $ionicSlideBoxDelegate.enableSlide(true);
    };

    $ionicSlideBoxDelegate.enableSlide(false);



    $scope.GPSTrace = [];

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

    $scope.centerAt = function(coords){
        $scope.position = coords;
    };

    $scope.center();

    $scope.savePosition = function(){
      var posOptions = [];
      $scope.getGPSPosition(posOptions).then( function(coords){
        $scope.GPSTrace.push(
          [coords.lat, coords.lng]
        );
      });
    };

    $scope.checkProximity = true;

    $scope.notifyProximity = function(){
      if($scope.checkProximity) {

        // config de la distance de notif
        var triggerDistance = 0.15;
        var dangerThreshold = 250;

        $scope.getGPSPosition([]).then( function(coords){
          for(var mrk in $scope.foxMarkers){
            var name = $scope.foxMarkers[mrk].name;
            var danger = $scope.foxMarkers[mrk].dangerzone;
            if(GeolocationService.getDistanceFromLatLonInKm(coords.lat, coords.lng, $scope.foxMarkers[mrk].coords.latitude, $scope.foxMarkers[mrk].coords.longitude) <= triggerDistance){
                $cordovaVibration.vibrate(10);
                var notif = (danger >= dangerThreshold ? SmartWatchService.getDanger(): SmartWatchService.getProximity());
                SmartWatchService.notify(name, danger, notif);
              break;
            }
          }
        });

      }
    };

    var positionSaver = $interval($scope.savePosition, 15000);
    var notificationTime = 60 * 1000;
    var notifySaver = $interval($scope.notifyProximity, notificationTime);
    var positionCenter = $interval($scope.center, 15000);

    $scope.stopCenter = function(){
      $interval.cancel(positionCenter);
    };

    $scope.resumeCenter = function(){
      var positionCenter = $interval($scope.center, 15000);
    };


    $scope.addPOI = function(){

      var tempMarker = MarkerService.getOfflineList();
      $scope.stopCenter();

      for(var i in tempMarker){

        $scope.centerAt(tempMarker[i].coords);

        var alertPopup = $ionicPopup.alert({
          title: 'Title',
          template: 'Alert message'
        });
      }

      $scope.resumeCenter();

    };


    $scope.URL = {
      "plantinder": "dbPathapi/planders",
      "poi": "dbPathapi/poi",
      "planders" : "dbPathapi/planders/result/"
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

    NgMap.getMap().then(function(evtMap) {
      console.log('setmap');
      $scope.map = evtMap;
      //interval = $interval(talk, 2000);
    });

    // Shows the informations of the marker once you clicked on it
    $scope.showDetail = function(e, poi) {
      console.log($scope.map);
      $scope.poi = poi;
      $scope.map.showInfoWindow('foo-iw', poi._id);
    };

    $scope.hideDetail = function() {
      $scope.map.hideInfoWindow('foo-iw');
    };

    $scope.vote = function (poi,score) {
      if (score == 1) {
        RESTService.get($scope.URL.vote + poi._id + "/plus", poi);
      } else {
        RESTService.get($scope.URL.vote + poi._id + "/moins", poi);
      }
    };


    $scope.form = {};

    $scope.poi = {};

    $scope.pictureURI = "";

    $scope.setURI = function (pictureData) {
      pictureData.then(function (path) {
        $scope.pictureURI = path;
      });
    };


}]);
