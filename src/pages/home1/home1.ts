import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Dataservice } from '../../providers/dataservice';
import { SignupPage } from '../signup/signup';
import { MainPage } from '../main-page/main-page';
import { Network } from '@ionic-native/network';

@IonicPage()
@Component({
  selector: 'page-home1',
  templateUrl: 'home1.html',
  providers: [Dataservice]
  
})
export class Home1 {
slideData:any = [];
scrollerimg:any =[];
productres:any;
electronicres:any;
mobileres:any;
travelres:any;
rechargeres:any;
freebiesres:any;
elect:any;
mob:any;
travl:any;
rechrge:any;
IsHidden:boolean;
searchTerm:any;
searchdata:any;
visible:boolean;
constructor(public navCtrl: NavController, private network: Network, public navParams: NavParams, public http: Http, private storage:Storage, public dataservice: Dataservice) {
  
let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
  alert("network was disconnected :-(");
});

this.allproduct();
this.electronics();
this.mobile();
this.travel();
this.recharge();
this.freebies();
this.slideData = [{ image: "img/slider1.jpg" },{ image: "img/slider2.jpg" },{ image: "img/slider4.jpg" }]

}


view(){
  this.navCtrl.push(SignupPage);
}

allproduct() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/product').map(res => res.json()).subscribe(data => {
      this.productres = data;
    });
  }

electronics() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Electronics').map(res => res.json()).subscribe(data => {
      this.electronicres = data;
      this.elect = data[0].slug;
    });
  }

  mobile() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Mobiles').map(res => res.json()).subscribe(data => {
      this.mobileres = data;
      this.mob = data[0].slug;
    });
  }

  travel() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Travel').map(res => res.json()).subscribe(data => {
      this.travelres = data;
      this.travl = data[0].slug;
    });
  }

  recharge() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Recharge').map(res => res.json()).subscribe(data => {
      this.rechargeres = data;
      this.rechrge = data[0].slug;
    });
  }

  freebies() { 
   this.http.get('http://bestoffershops.com/bestoffersApi/catProduct/Freebies').map(res => res.json()).subscribe(data => {
      this.freebiesres = data;
    });
  }

  opencategory(a){
    this.navCtrl.push(MainPage,{
      category:a
    });
  }

}
