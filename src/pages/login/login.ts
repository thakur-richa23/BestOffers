import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { GooglePlus, NativeStorage, Facebook } from 'ionic-native';
import { HomePage } from '../home/home';
import { Home1 } from '../home1/home1';
import { SignupPage } from '../signup/signup';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class Login {
  rootpage:any;
  data: any;
  postResponse: any =[];
  tabBarElement: any;
  navBarElement:any;
  headerElement:any;
  IsHidden:any;
  headerBarElement:any;
  scrollElement:any;
  margin:any;
  FB_APP_ID: number = 463366334017496;
  constructor(public navCtrl: NavController, public storage:Storage, public navParams: NavParams, public http: Http, public loadingCtrl:LoadingController) {
    this.http = http;
    this.data =[];
    this.data.email = '';
    this.data.password = '';
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.navBarElement = document.querySelector('ion-navbar.toolbar-md');

    Facebook.browserInit(this.FB_APP_ID, "v2.8");
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.navBarElement.style.display = 'none';
  }

   ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.navBarElement.style.display = 'flex';

  }
 
  login(email: String, password: String) {
    var bodyString = 'email=' + this.data.email + '&password=' + this.data.password;
    // Set content type to JSON
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // Create a request option
    let options = new RequestOptions({ headers: headers });
if(this.data.email != '' && this.data.password != ''){
   this.http.post('http://bestoffershops.com/bestoffersApi/login', bodyString, options).map(res => res.json()).subscribe(data => {
      this.postResponse = data[0];
      this.storage.set("userid", this.postResponse.id);
      this.storage.set("signed", true);
      if (this.postResponse.status != "failed") {
        alert("You have login successfully");
        this.navCtrl.setRoot(HomePage);

      } else {
        alert("Please enter appropriate details");
      }
    });
}else{
    alert("All fields are required");
}
 
  }

  googlelogin(){
 let nav = this.navCtrl;
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  loading.present();
  GooglePlus.login({
    'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
    'webClientId': '294730384466-48h6n0q2to5u78mkrrurgped5m2e5dvh.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
    'offline': true
  })
  .then(function (user) {
    loading.dismiss();

    NativeStorage.setItem('user', {
      name: user.displayName,
      email: user.email,
      picture: user.imageUrl
    })
    .then(function(){
      nav.push(Home1);
    }, function (error) {
      console.log(error);
    })
  }, function (error) {
    loading.dismiss();
  });
  }

fblogin(){
 let permissions = new Array<string>();
    let nav = this.navCtrl;
    //the permissions your facebook app needs from the user
    permissions = ["public_profile"];

    Facebook.login(permissions)
    .then(function(response){
      let userId = response.authResponse.userID;
      let params = new Array<string>();

      //Getting name and gender properties
      Facebook.api("/me?fields=name,gender", params)
      .then(function(user) {
        user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
        //now we have the users info, let's save it in the NativeStorage
        NativeStorage.setItem('user',
        {
          name: user.name,
          gender: user.gender,
          picture: user.picture
        })
        .then(function(){
          nav.push(Home1);
        }, function (error) {
          console.log(error);
        })
      })
    }, function(error){
      console.log(error);
    });
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }
}
