/**
 * Created by user on 06/06/17.
 */

/*import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

constructor(private bluetoothSerial: BluetoothSerial) { }*/

angular.module('foxapp')
  .factory('SmartWatchService', ['$cordovaGear',

    //REGARDE EN BAS DU LIEN https://seap.samsung.com/sample-app/cordova-plugins-samsung-demo-app
    //Le wrapper est défini dans RichNotificationWrapper
    //il implémente le js du plugin décrit /home/user/projuin/fox_trotters/private/foxapp/plugins/RichNotification/www/richnotification.js
    //C'est le yolo total après, mais au moins ça passe la compilation angular, à prioris ça devrait marcher

    function ($cordovaGear) {
      return {
        notificate : function(){
            //var jsonPOI = {name: namePOI, pos: positionPOI};
          if($cordovaGear.isSupported() && $cordovaGear.isConnected()){
            $cordovaGear.send();
          }
        }
      }
    }]);
