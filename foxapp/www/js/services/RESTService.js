/**
 * Created by user on 06/06/17.
 */
angular.module('foxapp')

.factory("RESTService", ["$http",
  function($http){
  return{
    get : function(URL){
      return $http.get(URL).then(function (data) {
        return data.data;
      });
    },
    post : function(URL, data){
      var req = {
        method: 'POST',
        url: URL,
        data:data
      }
      return $http(req).then(function(data) {

        return data.data;
      })
    }
  }
}]);
