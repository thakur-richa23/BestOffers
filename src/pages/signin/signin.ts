import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HomePage } from '../home/home';
import { SignupPage } from '../signup/signup';
import { Login } from '../login/login';
import { Profile } from '../profile/profile';
import { Contact } from '../contact/contact';
import { About } from '../about/about';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class Signin {
  SignupPage:any;
  Login:any;
  tabBarElement:any;
  navBarElement:any;
//  icons: string[];
//  name:string[];
IsHidden:any=true;
//   items: Array<{title: string,icon: string}>;
// ngOnInit(){
//     // Let's populate this page with some filler content for funzies
//     this.icons = ['person', 'information-circle', 'mail'];
//     this.name=['Profile','About','Contact']
//     this.items = [];
//     for (let i = 0; i < 3; i++) {
//       this.items.push({
//         title: this.name[i],
//         icon: this.icons[i]
//       });
//     }
// }
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.IsHidden = this.IsHidden == true ? false : true;
  this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.navBarElement = document.querySelector('ion-navbar.toolbar-md');
}

ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.navBarElement.style.display = 'flex';
  }

   ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.navBarElement.style.display = 'none';

  }

  signup(){
   this.navCtrl.push(SignupPage);
  }
  login(){
    this.navCtrl.push(Login);
  }
  contact(){
    this.navCtrl.push(Contact);
  }
  about(){
    this.navCtrl.push(About);
  }
  profile(){
    this.navCtrl.push(Profile);
  }
}
