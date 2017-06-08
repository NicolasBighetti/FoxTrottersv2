/**
 * Created by user on 08/06/17.
 */
angular.module('foxapp')
.factory('PictureUploadService', ['Upload',

  function(Upload){

      return{
      upload : function (file, URL) {
        if(file === undefined)
          return;

        console.log(file);

        Upload.upload({
          url: URL,
          newProfilePicture: file
        }).then(function (resp) {
          console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
          console.log('Error status: ' + resp.status);
        });
      }
    }
}]);
