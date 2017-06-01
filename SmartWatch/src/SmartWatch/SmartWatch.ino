/*
 * Blink
 * Turns on an LED on for one second,
 * then off for one second, repeatedly.
 */

#include <Arduino.h>
#include <CurieBLE.h>
#include <LiquidCrystal.h>

BLEPeripheral blePeripheral;  // BLE Peripheral Device (the board you're programming)
BLEService comService("e582195d-50e4-4fc0-8dca-a8b10704694d"); // Communication Service
BLECharacteristic message("e582195d-50e4-4fc0-8dca-a8b10704694d", BLERead | BLEWrite,16);
LiquidCrystal lcd(10, 11, 12, 13, 14, 15, 16);


char typedMessage[32];

void setup()
{

  Serial.begin(9600);
  //while (!Serial);
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

  // set up the LCD's number of columns and rows:
  lcd.begin(16, 2);
  // Print a message to the LCD.
  lcd.print("My FoxTrotters");
  lcd.setCursor(2,1); // set to the 3th column and 2nd row
  lcd.print("watch");

  Serial.println("Ready to start BLE");

  blePeripheral.begin();
  Serial.println("Starting bluetooth");
}

void loop()
{

  BLECentral central = blePeripheral.central();

  if(central){
    Serial.println("Connected to central");

    while (central.connected()) {
      if(message.written()){
       
        sprintf(typedMessage,"%16c",NULL);
        strncpy(typedMessage,(char*)message.value(),message.valueLength());
        lcd.clear();
        lcd.print(typedMessage);
      }
    }
  }

  delay(1000);
}
