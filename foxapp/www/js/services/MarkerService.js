/**
 * Created by user on 01/06/17.
 */
angular.module('foxapp')
  .factory('MarkerService', ['RESTService',

    function (RESTService) {

      var offlinePOI = [];

      return {

        getAllMarkers : function() {
          return RESTService.get(dbPath+"api/pois");
        },

        pushPosition : function(coords, imagePath){
          var poi = {
            "coords":coords,
            "imagePath": imagePath
          };

          offlinePOI.push(poi);
          console.log(offlinePOI);
        },

        getOfflineList : function(){
          return offlinePOI;
        }

      };
    }
  ]);
