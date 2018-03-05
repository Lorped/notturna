import { Component } from '@angular/core';
import { Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Push, PushObject, PushOptions } from '@ionic-native/push';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

	rootPage:any = 'LoginPage';

	constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,  public push: Push, public alertCtrl: AlertController ) {
		platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			statusBar.styleDefault();
			splashScreen.hide();
			this.pushsetup();
		});
	}
  
	pushsetup() {
		const options: PushOptions = {
			android: {
				senderID: '842960782494',
				sound: 'true',
				forceShow: true
			},
			ios: {
				alert: 'true',
				badge: true,
				sound: 'true'
			},
			windows: {}
		};
 
		const pushObject: PushObject = this.push.init(options);
 
		pushObject.on('notification').subscribe((notification: any) => {
			if (notification.additionalData.foreground) {
				let youralert = this.alertCtrl.create({
					title: 'New Push notification',
					message: notification.message
				});
				youralert.present();
			}
			console.log('Received a notification', notification);
		});
 
		pushObject.on('registration').subscribe((registration: any) => {
			//do whatever you want with the registration ID
			console.log('Device registered', registration);
		});
 
		pushObject.on('error').subscribe(error => alert('Error with Push plugin' + error));
	}
}

