import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController} from 'ionic-angular';
import { StatusBar} from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Signin } from '../pages/signin/signin';
import { Login } from '../pages/login/login';
import { About } from '../pages/about/about';
import { Contact } from '../pages/contact/contact';
import { SignupPage } from '../pages/signup/signup';
import { Storage } from '@ionic/storage';
import { Categoryitems } from '../pages/categoryitems/categoryitems';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;
  loggedIn: boolean;
  name:any;
  pages: Array<{title: string, component: any, icon:any}>;

  constructor(public platform: Platform, public storage: Storage, public statusBar: StatusBar, public splashScreen: SplashScreen, public menu:MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: "home" },
      { title: 'About', component: About, icon: "people" },
      { title: 'Contact', component: Contact, icon: "contact" },
      { title: 'Logout', component: Login, icon: "power" },
      // { title: 'Recharge', component: MainPage, icon: "phone-portrait" },
      // { title: 'More', component: MainPage, icon: "more" }
    ];

  this.storage.get('signed').then((signed) => { 
  this.loggedIn = signed;
   if (!this.loggedIn) { 
     this.rootPage = Login;
    } else if (this.loggedIn) {
       this.rootPage = HomePage;
       
      }
  }); 

  }

signuppage(){
  this.nav.push(SignupPage);
  
}
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
