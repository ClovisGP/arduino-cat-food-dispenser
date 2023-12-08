#include <WiFi.h>
#include <HTTPClient.h>
#include <WiFiManager.h> // Include WiFiManager library

const char* serverURL = "http://your-intermediary-server-ip:3000/cat-food-dispenser";

// et le servURL
//Manque le get

/* WIFI CONNECTION */

bool connectionWifi() {
  WiFiManager wifiManager;

  // Uncomment the next line for testing the WiFiManager
  // wifiManager.resetSettings();
  
  if (!wifiManager.autoConnect("ESP32-AP")) {
    Serial.println("Failed to connect and hit timeout. Resetting and retrying...");
    delay(1000);
    ESP.restart();
    delay(5000);
  }

  Serial.println("Connected to Wi-Fi!");
}

/* Egt the last config update. If there is one, return the json into string. Unless return an empty string */
bool getLastUpdate() {
  bool result = false;
  HTTPClient http;
  
  http.addHeader("Content-Type", "application/json");

  int response = http.GET(serverURL);
  String payload = "";

  if (response == 200) {
    payload = http.getString();
  }

  http.end();
  return payload;
}

/* Send each time a cat or multiple cats come eat.*/
bool sendcatFeed(String * puceList) {
  bool result = false;
  HTTPClient http;
  
  http.addHeader("Content-Type", "application/json");
  String requestBody = "{\"puceCats\":\"" + puceList + "\""};

  if (http.POST(serverURL, requestBody) == 200) {
    result = true;
  } else {
    result = false;
  }
  
  http.end();
  return result;
}

/* Send other information like the TanlSOonEmpty */
bool sendDispenserExchange(int idInfo) {
  bool result = false;
  HTTPClient http;
  
  http.addHeader("Content-Type", "application/json");
  String requestBody = "{\"idInfo\":\"" + idInfo + "\""};

  if (http.POST(serverURL, requestBody) == 200) {
    result = true;
  } else {
    result = false;
  }
  
  http.end();
  return result;
}


void setup() {
  Serial.begin(115200);

  connectionWifi();
}

void loop() {


  // Wait before the next iteration
  delay(5000);
}
