import { Component } from '@angular/core';
import { NavController, NavParams, MenuController} from 'ionic-angular';
import { Profile } from '../profile/profile';
import {Tabs} from "ionic-angular";
import { Home1 } from '../home1/home1';
import { Categoryitems } from '../categoryitems/categoryitems';
import { Signin } from '../signin/signin';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Dataservice } from '../../providers/dataservice';
import { Network } from '@ionic-native/network';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [Dataservice]
})
export class HomePage {
 
  tab1 =Home1;
  tab2 = Categoryitems;
  tab3= Signin;
  IsHidden:any=true;
  searchTerm: any;
  searchdata: any;
  constructor(public navCtrl: NavController, private network: Network, public menu:MenuController, public navParams:NavParams, public http:Http, private storage: Storage, public dataservice: Dataservice) { 
    this.dataservice;
    this.searchTerm = '';

    let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
  alert("network was disconnected :-(");
});
}

  searchbtn(){
   this.IsHidden = this.IsHidden == true ? false : true;

  }
  backbtn(){
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
  }

  onInput(){
  this.http.get('http://bestoffershops.com/bestoffersApi/search?slug=' + this.searchTerm).map(res => res.json()).subscribe(data => {
        this.searchdata = data;
      });
  }

}
