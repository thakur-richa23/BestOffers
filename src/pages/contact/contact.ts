import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html',
})
export class Contact {
 data:any;
 postResponse:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl:LoadingController) {
    this.http = http;
    this.data={};
    this.data.name="";
    this.data.email="";
    this.data.message="";
  }

submit(name: String, email: String, message: String) {
    var bodyString = 'name=' + this.data.name + '&email=' + this.data.email + '&msg=' + this.data.message;
    
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    let options = new RequestOptions({ headers: headers });
if(this.data.name != '' && this.data.email != '' && this.data.message != ''){
   this.http.post('http://bestoffershops.com/bestoffersApi/contactus', bodyString, options).map(res => res.json()).subscribe(data => {
      this.postResponse = data;status
      if(this.postResponse.status == "success"){
        alert("Thank you For Contacting Us We Revert You Soon");
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }else{
        alert("Please enter appropriate details");
        this.navCtrl.setRoot(this.navCtrl.getActive().component);
      }
    });
}else{
    alert("All fields are required");
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
}
  }

  back(){
  this.navCtrl.push(HomePage);
  window.location.reload(true);
}
  
}
