var myApp = angular.module('foxapp',[]);

myApp.controller('MapController', ['$scope',

  function(NgMap) {
    NgMap.getMap().then(function(map) {
      console.log(map.getCenter());
      console.log('markers', map.markers);
      console.log('shapes', map.shapes);


  });
}]);
