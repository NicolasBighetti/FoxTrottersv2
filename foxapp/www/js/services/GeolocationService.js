/**
 * Created by user on 08/06/17.
 */
angular.module('foxapp')

.factory('GeolocationService',['$cordovaGeolocation',

  function($cordovaGeolocation){

  return {

    getCurrentPosition : function(posOptions) {

      return $cordovaGeolocation.getCurrentPosition(posOptions).
      then(function (position) {
        var coord = [];


        coord.lat = position.coords.latitude;
        coord.lng = position.coords.longitude;
        console.log('la localisation');

        return coord;


      }, function (err) {
        var coord = [];
        console.log('default coord');
        console.log(err);
        coord.lat = 43.6156;
        coord.lng = 7.0719;

        return coord;
      });
    }

  }

  }]);
