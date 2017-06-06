

angular.module('foxapp', [])

  .factory('$cordovaGear', [function () {


    var isSupported = function () {

      var success = function(){
        return true;
      };

      var fail = function(){
        return false;
      }

      RichNotification.isSupported(
        success,
        fail
      );
    };


    var isConnected = function () {
      var success = function(){
        return true;
      };

      var fail = function(){
        return false;
      }

      RichNotification.isConnected(
        success,
        fail
      );
    };

    var registerEventListeners = function () {
      var success = function(){
        return true;
      };

      var fail = function(){
        return false;
      }

      RichNotification.registerEventListeners(
        success,
        fail
      );
    };


    var send = function (options) {
      var success = function(){
        return true;
      };

      var fail = function(){
        return false;
      }

      RichNotification.send(
        options,
        success,
        fail
      );
    };


    var dismiss = function (uuid) {
      var success = function(){
        return true;
      };

      var fail = function(){
        return false;
      }

      RichNotification.isSupported(
        uuid,
        success,
        fail
      );
    };

  }]);
