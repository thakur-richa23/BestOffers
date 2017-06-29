import { Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Dataservice {
globalvar:any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.globalvar = 1; 
  }

}
