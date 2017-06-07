/**
 * Created by user on 01/06/17.
 */
angular.module('foxapp')
  .factory('MarkerService', ['RESTService',

    function (RESTService) {
      return {

        getAllMarkers : function() {
          return RESTService.get("http://ns388671.ip-176-31-254.eu/api/pois");
        },

        getMarkers: function () {
          var mock = {

            "markers":
            [
              {
                "nom": "thym",
                "theme":"plante",
                "latitude": 43.7025,
                "longitude": 7.26333
              },
              {
                "nom": "oursins",
                "theme":"test",
                "latitude": 43.3025,
                "longitude": 7.56333
              },
              {
                "nom": "romarin",
                "theme":"plante",
                "latitude": 43.9925,
                "longitude": 7.16333
              },
              {
                "nom": "thym",
                "theme":"plante",
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
