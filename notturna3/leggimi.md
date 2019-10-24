Edit file platforms/android/build.gradle:

configurations {
    all*.exclude group: 'com.android.support', module: 'support-v13'
}


Removing this line from project properties worked for me,
cordova.system.library.3=com.android.support:support-v13:26.+



replace the availableDevices function in platforms/ios/cordova/lib/list-emulator-build-targets with the following:

var availableDevices = Object.keys(devices).reduce(function (availAcc, deviceCategory) {
    var availableDevicesInCategory = devices[deviceCategory];
    availableDevicesInCategory.forEach(function (device) {
        if (device && device.name === deviceType.name.replace(/\-inch/g, ' inch') && device.isAvailable == true) {
            availAcc.push(device);
        }
    });
    return availAcc;
}, []);
