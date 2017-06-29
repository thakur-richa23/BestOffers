import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, LoadingController, NavParams, ActionSheetController,ToastController } from 'ionic-angular';
import { File } from 'ionic-native';
import { Transfer } from 'ionic-native';
import { FilePath } from 'ionic-native';
import { Camera } from 'ionic-native';
import { Crop } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { Home1 } from '../home1/home1';
import { Login } from '../login/login';
import { Profile } from '../profile/profile';

declare var cordova:any;
@IonicPage()
@Component({
  selector: 'page-main-page',
  templateUrl: 'main-page.html',
})
export class MainPage {
tabBarElement:any;
navBarElement:any;
category:any;
categorylist:any;
categoryitem:any = [];
catimage:any;
catiprice:any;
similar:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.navBarElement = document.querySelector('ion-navbar.toolbar-md');
    this.categorylist = this.navParams.get("category");
    this.subcategory();
  }
subcategory(){

 this.http.get('http://bestoffershops.com/bestoffersApi/singleProduct/' +this.categorylist).map(res => res.json()).subscribe(data => {
      this.categoryitem= data[0];
      this.similar = data.similar;
    });
}

ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.navBarElement.style.display = 'none';
  }

ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.navBarElement.style.display = 'flex';

  }
}
