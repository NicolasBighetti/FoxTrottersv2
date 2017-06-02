/**
 * Created by user on 01/06/17.
 */
angular.module('RouteConfiguration', ['ngRoute'])
  .config(function($routeProvider, $locationProvider){

    $routeProvider
      .when('/',{
          templateUrl: 'page/map.html',
          controller: 'js/controllers/GMapController.js'
        }
      )
      .when('foxapp/plantinder',{
        templateUrl:'page/plantinder.html',
        controller: 'js/controllers/PlantinderController.js'
        }

      )
      .otherwise({
      redirect: '/'
    });

  });

