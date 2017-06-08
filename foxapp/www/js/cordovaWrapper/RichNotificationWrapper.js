
angular.module('foxapp')

  .factory('$cordovaGear', [

    function () {

    return {
      isSupported : function () {

        var success = function () {
          return true;
        };

        var fail = function () {
          return false;
        };

        RichNotification.isSupported(
          success,
          fail
        );
      },


      isConnected : function () {
        var success = function () {
          return true;
        };

        var fail = function () {
          return false;
        };

        RichNotification.isConnected(
          success,
          fail
        );
      },

      registerEventListeners : function () {
        var success = function () {
          return true;
        };

        var fail = function () {
          return false;
        }

        RichNotification.registerEventListeners(
          success,
          fail
        );
      },


      send : function (options) {
        var success = function () {
          return true;
        };

        var fail = function () {
          return false;
        };

        RichNotification.send(
          options,
          success,
          fail
        );
      },


      dismiss : function (uuid) {
        var success = function () {
          return true;
        };

        var fail = function () {
          return false;
        }

        RichNotification.isSupported(
          uuid,
          success,
          fail
        );
      }
    }
  }]);
