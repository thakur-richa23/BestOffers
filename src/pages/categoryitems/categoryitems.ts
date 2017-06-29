import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Home1 } from '../home1/home1';
import { Http, Headers, RequestOptions } from '@angular/http';
import { MainPage } from '../main-page/main-page';

@IonicPage()
@Component({
  selector: 'page-categoryitems',
  templateUrl: 'categoryitems.html',
})
export class Categoryitems {
tabBarElement:any;
navBarElement:any;
electronicres:any;
mobileres:any;
travelres:any;
rechargeres:any;
freebiesres:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public http:Http) {
  this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
  this.navBarElement = document.querySelector('ion-navbar.toolbar-md');
  this.electronics();
  this.mobile();
  this.travel();
  this.recharge();
  this.freebies();
  }

  ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.navBarElement.style.display = 'none';
  }

   ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.navBarElement.style.display = 'flex';
  }

  back(){
    this.navCtrl.push(Home1);
  }


electronics() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Electronics').map(res => res.json()).subscribe(data => {
      this.electronicres = data[0].slug;

    });
  }

  mobile() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Mobiles').map(res => res.json()).subscribe(data => {
      this.mobileres = data[0].slug;
    });
  }

  travel() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Travel').map(res => res.json()).subscribe(data => {
      this.travelres = data[0].slug;
    });
  }

  recharge() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Recharge').map(res => res.json()).subscribe(data => {
      this.rechargeres = data[0].slug;
    });
  }

  freebies() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Freebies').map(res => res.json()).subscribe(data => {
      this.freebiesres = data[0].slug;
    });
  }

  variouscat(a){
  this.navCtrl.push(MainPage,{
  category:a
})
}

}
