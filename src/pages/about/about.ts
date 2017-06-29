import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-about',
  templateUrl: 'about.html',
})
export class About {
aboutres:any =[];
descr:any;
descrres:any;
title:any;
constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http, public loadingCtrl:LoadingController) {
  this.about();
}
about(){
this.http.get('http://bestoffershops.com/bestoffersApi/aboutus').map(res => res.json()).subscribe(data => {
      this.aboutres = data[0].title;
      this.title=this.aboutres; 
      this.descrres = data[0].desc;
      this.descr =this.descrres; 
    });
}

back(){
  this.navCtrl.push(HomePage);
  window.location.reload(true);
}

}
