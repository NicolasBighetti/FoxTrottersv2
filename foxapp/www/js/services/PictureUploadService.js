/**
 * Created by user on 08/06/17.
 */
angular.module('foxapp')
.factory('PictureUploadService', ['Upload',

  function(Upload){

      return{
      upload : function (file, URL) {
        Upload.upload({
          url: URL,
          data: {file: file, 'username': $scope.username}
        }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
          console.log('Error status: ' + resp.status);
        }, function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        });
      }
    }
}]);
