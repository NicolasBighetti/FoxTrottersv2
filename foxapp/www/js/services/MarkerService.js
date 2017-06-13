/**
 * Created by user on 01/06/17.
 */
angular.module('foxapp')
  .factory('MarkerService', ['RESTService',

    function (RESTService) {
      return {

        getAllMarkers : function() {
          return RESTService.get(dbPath+"api/pois");
        },

        getMarkers: function () {
          var mock =[
              {
                "name": "thym",
                "typep":"plant",
                "coords" : {
                  "latitude": 43.7025,
                  "longitude": 7.26333
                }
              },
              {
                "name": "Point d'eau",
                "typep":"water",
                "coords" : {
                  "latitude": 43.3025,
                  "longitude": 7.56333
                }
              },
              {
                "name": "romarin",
                "typep":"plant",
                "coords": {
                  "latitude": 43.9925,
                  "longitude": 7.16333
                }
              },
            {
              "name": "thym",
              "typep":"plant",
              "coords": {
                "latitude": 43.7425,
                "longitude": 7.29333
              }

            }
]


          return mock;
        }

      }
    }
  ]);
