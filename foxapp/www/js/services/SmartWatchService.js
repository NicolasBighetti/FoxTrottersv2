/**
 * Created by user on 06/06/17.
 */

/*import { BluetoothSerial } from '@ionic-native/bluetooth-serial';

constructor(private bluetoothSerial: BluetoothSerial) { }*/

angular.module('foxapp')
  .factory('SmartWatchService', ['$cordovaGear',

    //REGARDE EN BAS DU LIEN https://seap.samsung.com/sample-app/cordova-plugins-samsung-demo-app
    //Le wrapper est défini dans RichNotificationWrapper
    //il implémente le js du plugin décrit /home/user/projuin/fox_trotters/private/foxapp/plugins/com.samsung.richnotification/www/richnotification.js
    //C'est le yolo total après, mais au moins ça passe la compilation angular, à prioris ça devrait marcher
    //Samsung Gear > Notifications > Limit notifications
    function ($cordovaGear) {
      return {
        notificate: function () {
          //var jsonPOI = {name: namePOI, pos: positionPOI};
           console.log('sending notif');

            var opts = {
              "uuid": "",
              "readoutTitle": "Vous êtes a proximité d'un point d'intérêt",
              "readout": "Vous êtes a proximité d'un point d'intérêt",
              "notificationTitle": "Vous êtes a proximité d'un point d'intérêt",
              "headerSizeType": undefined,
              "primarySubHeader": "Vous êtes a proximité d'un point d'intérêt",
              "primaryBody": "",
              "primaryQRImage": "",
              "primaryBackgroundColor": "#008000",
              "primaryBackgroundImage": "",
              "secondaryType": undefined,
              "secondarySubHeader": "",
              "secondaryContent": "",
              "secondaryBackgroundColor": "",
              "secondaryImage": "",
              "smallIcon1Path": "",
              "smallIcon1Text": "",
              "smallIcon2Path": "",
              "smallIcon2Text": "",
              "notificationIcon": "",
              "alertType": "104",
              "popupType": "202",
              "actions": null
            };
            $cordovaGear.send(opts);


        }
      }

    }]);
