import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Profile } from '../pages/profile/profile';
import { Editprofile } from '../pages/editprofile/editprofile';
import { Categoryitems } from '../pages/categoryitems/categoryitems';
import { Home1 } from '../pages/home1/home1';
import { Signin } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { Login } from '../pages/login/login';
import { About } from '../pages/about/about';
import { MainPage } from '../pages/main-page/main-page';
import { Contact } from '../pages/contact/contact';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { IonicStorageModule  } from '@ionic/storage';
import { Dataservice } from '../providers/dataservice';
import { Network } from '@ionic-native/network';
import {HttpModule , Headers, RequestOptions } from '@angular/http';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    Profile,
    Categoryitems,
    Home1,
    Signin,
    SignupPage,
    Login,
    About,
    Contact,
    Editprofile,
    MainPage
  ],
  imports: [
    BrowserModule,
    HttpModule ,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({
      name: '__misplaces',
      driverOrder: ['indexeddb', 'sqlite', 'websql']
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    Profile,
    Categoryitems,
    Home1,
    Signin,
    SignupPage,
    Login,
    About,
    Contact,
    Editprofile,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Dataservice,
    Network,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
