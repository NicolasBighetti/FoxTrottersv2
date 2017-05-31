/*
 * Blink
 * Turns on an LED on for one second,
 * then off for one second, repeatedly.
 */

#include <Arduino.h>
#include <CurieBLE.h>

BLEPeripheral blePeripheral;  // BLE Peripheral Device (the board you're programming)
BLEService comService("e582195d-50e4-4fc0-8dca-a8b10704694d"); // Communication Service
BLECharacteristic message("e582195d-50e4-4fc0-8dca-a8b10704694d", BLERead | BLEWrite,16);

char typedMessage[32];

void setup()
{

  Serial.begin(9600);
  while (!Serial);
  Serial.println("Beginning");
  blePeripheral.setLocalName("FoxTrotters_SmartWatch");
  blePeripheral.setAdvertisedServiceUuid(comService.uuid());

  //add service and charac
  blePeripheral.addAttribute(comService);
  blePeripheral.addAttribute(message);
  blePeripheral.setAppearance(true);

  message.setValue((unsigned char *)typedMessage,32); //set to default value


  // initialize LED digital pin as an output.
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.println(comService.uuid());
  Serial.println(String(BLENotify));

  Serial.println("Ready to start BLE");

  blePeripheral.begin();
  Serial.println("Starting bluetooth");
}

void loop()
{
  Serial.println("loop");

  /*BLECentral central = blePeripheral.central();

  if(central){
    Serial.println("Connected to central");

    while (central.connected()) {
      if(message.written()){
        // turn the LED on (HIGH is the voltage level)
        digitalWrite(LED_BUILTIN, HIGH);
        // wait for a second
        delay(1000);
        // turn the LED off by making the voltage LOW
        digitalWrite(LED_BUILTIN, LOW);
         // wait for a second
        sprintf(typedMessage,"%16c",NULL);
        strncpy(typedMessage,(char*)message.value(),message.valueLength());
        Serial.println(typedMessage);
      }
    }
  }*/

  delay(1000);
}
