import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, LoadingController, NavParams, ActionSheetController,ToastController } from 'ionic-angular';
import { File } from 'ionic-native';
import { Transfer } from 'ionic-native';
import { FilePath } from 'ionic-native';
import { Camera } from 'ionic-native';
import { Crop } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Home1 } from '../home1/home1';
import { Login } from '../login/login';
import { Profile } from '../profile/profile';

declare var cordova:any;
@IonicPage()
@Component({
  selector: 'page-editprofile',
  templateUrl: 'editprofile.html',
})
export class Editprofile {

usrid:any;
tabBarElement:any;
navBarElement:any;
data:any;
updateres:any;
postResponse: any;
  constructor(public navCtrl: NavController,public http:Http, public toastCtrl: ToastController, public storage: Storage,public loadingCtrl: LoadingController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,public platform: Platform) {
  this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  this.navBarElement = document.querySelector('ion-navbar.toolbar-md');
  this.http = http;
  this.data = [];
  this.data.name="";
  this.data.currpass="";
  this.data.newpass="";
  this.data.confirmpass="";
}

ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.navBarElement.style.display = 'none';
  }

   ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.navBarElement.style.display = 'flex';

  }

  submit(){
    this.storage.get('userid').then((userid) => {
    this.usrid = userid;
    var bodyString = 'id=' + this.usrid + '&cur_paswd=' + this.data.currpass + '&new_paswd=' + this.data.newpass + '&confirm_paswd=' + this.data.confirmpass+ '&username=' +this.data.name;
    
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    
    let options = new RequestOptions({ headers: headers });
    if(this.data.name != '' && this.data.currpass != '' && this.data.newpass != '' && this.data.confirmpass != ''){
   this.http.post('http://bestoffershops.com/bestoffersApi/updateProfile', bodyString, options).map(res => res.json()).subscribe(data => {
      this.postResponse = data;
     if(this.postResponse.status == "success"){
          alert("Your updation submitted successfully");
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
     }else{
          alert("old password invalid");
          this.navCtrl.setRoot(this.navCtrl.getActive().component);
     }
    });
    }else{
          alert("All fields are required");
    }
    })
  }

  back(){
  this.navCtrl.push(Profile);
}

}
