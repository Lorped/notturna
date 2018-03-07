Edit file platforms/android/build.gradle:

configurations {
    all*.exclude group: 'com.android.support', module: 'support-v13'
}


Removing this line from project properties worked for me,
cordova.system.library.3=com.android.support:support-v13:26.+
