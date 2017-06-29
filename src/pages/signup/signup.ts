import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';
import { Login } from '../login/login';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
data:any ;
postResponse:any;
tabBarElement: any;
navBarElement:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {

    this.http = http;
    this.data = [];
    this.data.username = '';
    this.data.email = '';
    this.data.password = '';
    this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.navBarElement = document.querySelector('ion-navbar.toolbar');
  }

ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.navBarElement.style.display = 'none';
  }

   ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.navBarElement.style.display = 'flex';
  }


  signup(email: String, password: String, username: String){
  var  bodyString = 'username='+this.data.username+'&password='+this.data.password+'&email='+this.data.email;
  // Set content type to JSON
  var headers  = new Headers(); 
  headers.append("Accept", 'application/x-www-form-urlencoded');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');
  // Create a request option
  let options = new RequestOptions({ headers: headers }); 
if(this.data.username != '' && this.data.email != '' && this.data.password != ''){
 this.http.post('http://bestoffershops.com/bestoffersApi/signup',bodyString, options).map(res =>res.json()).subscribe(data =>{
     this.postResponse = data;
      if(this.postResponse.status == "success"){
          alert("You have registered successfully");
          this.navCtrl.push(Login);
      }else if(this.postResponse.status == "already exist"){
          alert("Already Registered");
      }
    });
}else{
  alert("All fields are required");
}
 
}

login(){
  this.navCtrl.push(Login);
}
  
}
