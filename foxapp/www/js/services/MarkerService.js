/**
 * Created by user on 01/06/17.
 */
angular.module('foxapp')
  .factory('MarkerService', ['RESTService',

    function (RESTService) {
      return {
        getMarkers: function () {
          var mock = {

            "coords":
            [
              {
                "latitude": 43.7025,
                "longitude": 7.26333
              },
              {
                "latitude": 43.3025,
                "longitude": 7.56333
              },
              {
                "latitude": 43.9925,
                "longitude": 7.16333
              },
              {
                "latitude": 43.7425,
                "longitude": 7.29333
              }

            ]

        };

          return mock;
        }
      }
    }
  ]);
