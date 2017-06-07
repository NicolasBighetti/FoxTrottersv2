angular.module('foxapp')

  .controller('PlantinderController', ['$scope','$swipe','$ionicPopup',

    function($scope, $swipe, $ionicPopup){

    $scope.size = {
      width : 200,
      height : 100
    };

      $scope.itemsCollection = [{
        thumbnail: 'pictures/01.jpeg',
        title: '',
        subtitle: ''
      }, {
        thumbnail: 'pictures/02.jpeg',
        title: '',
        subtitle: ''
      },
        {
        thumbnail: 'pictures/03.jpg',
        title: '',
        subtitle: ''
      }, {
        thumbnail: 'pictures/04.jpg',
        title: '',
        subtitle: ''
      }],
        $scope.zoomPicture = function(){
          console.log('je suis le zoom');
      };
      $scope.showinfo = function(){
          console.log('je suis linfo');
      };


      $scope.swipeLeft = function(){
          console.log('left');
      };

      $scope.swipeRight = function(){

        var myPopup = $ionicPopup.show({
          template: '<input type="text">',
          title: 'Entrez le nom de la plante',
          subTitle: '',
          scope: $scope,
          buttons: [
            { text: 'Annuler' },
            {
              text: '<b>Identifier</b>'
            }
          ]
        })
      };

      $scope.swipeend = function(){
        console.log('ttestetete');
        $scope.showModal = false;
      }

      $scope.open = function() {
        $scope.showModal = true;
      };

      $scope.ok = function() {
        $scope.showModal = false;
      };

      $scope.cancel = function() {
        $scope.showModal = false;
      };




    }]);
