/**
 * This is a simple app to test the functionality of node-serialport and USB-detection 
 * Created by kc on 28.10.15.
 */
'use strict';

var serialPortLib = require('serialport');
var SerialPort = require('serialport').SerialPort;
var usbDetect = require('usb-detection');
var _ = require('lodash');

var summaryOnly = true;

function scanPorts() {
  serialPortLib.list(function(err, ports){
    if (err) {
      console.error('Error while listing ports', err);
      return;
    }
    if (summaryOnly) {
      console.log('Ports found: ' + ports.length);
    }
    else {
      console.log('Found the following serial ports:', ports);
    }

  });
}

function periodicScan() {
  scanPorts();
  _.delay(periodicScan, 2000);
}

usbDetect.on('add:4292:34980', function (device) {
  console.log('RapidConnect found ----------------------------------------------');
  if (!summaryOnly) {
    // With Mac OS X El Capitan this will not issue the device, with Yosemite it had
    console.log('Device: ', device);
  }
  scanPorts();
});

usbDetect.on('remove:4292:34980', function (device) {
  console.log('RapidConnect removed ----------------------------------------------');
  scanPorts();
});

periodicScan();
