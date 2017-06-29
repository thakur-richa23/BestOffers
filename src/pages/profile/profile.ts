import { Component } from '@angular/core';
import { IonicPage, NavController, Platform, LoadingController, NavParams, ActionSheetController,ToastController } from 'ionic-angular';
import { File } from 'ionic-native';
import { Transfer } from 'ionic-native';
import { FilePath } from 'ionic-native';
import { Camera } from 'ionic-native';
import { Crop } from 'ionic-native';
import { Storage } from '@ionic/storage';
import { Http, Headers, RequestOptions} from '@angular/http';
import { Home1 } from '../home1/home1';
import { Login } from '../login/login';
import { Signin } from '../signin/signin';
import { Editprofile } from '../editprofile/editprofile';

declare var cordova:any;
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class Profile {
lastImage:any;
loading:any;
usrid:any;
tabBarElement:any;
navBarElement:any;
profile:any = [];
filename:any;
image:any;
  constructor(public navCtrl: NavController,private http:Http, public toastCtrl: ToastController, public storage: Storage,public loadingCtrl: LoadingController, public navParams: NavParams,public actionSheetCtrl: ActionSheetController,public platform: Platform) {
  this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.navBarElement = document.querySelector('ion-navbar.toolbar-md');

    this.storage.get('userid').then((userid) => {
      this.usrid = userid;
       this.http.get("http://bestoffershops.com/bestoffersApi/getProfile/"+ this.usrid).map(res =>res.json()).subscribe(data =>{
        this.profile= data[0];
      })
    })
  }

ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
    this.navBarElement.style.display = 'none';
  }
   ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
    this.navBarElement.style.display = 'flex';
  }

  public presentActionSheet()
 {
 let actionSheet = this.actionSheetCtrl.create({
    //  title: 'Select Image Source',
      buttons: [{
          text: 'Upload Picture',
          cssClass:'upload',
          handler: () => {
            this.takePicture(Camera.PictureSourceType.PHOTOLIBRARY);
          //  this.uploadImage();
          }
        },
        {
          text: 'Use Camera',
           cssClass:'camera',
          handler: () => {
           this.takePicture(Camera.PictureSourceType.CAMERA);
         //  this.uploadImage();
          }
        },
        {
          text: 'Cancel',
           cssClass:'cancel',
          role: 'cancel'
        }]
    });
    actionSheet.present();
}
public takePicture(sourceType) {
  // Create options for the Camera Dialog
  var options = {
    quality: 100,
    allowEdit: true,
    sourceType: sourceType,
    saveToPhotoAlbum: false,
    correctOrientation: true,
    destinationType: Camera.DestinationType.FILE_URI
  };
 
  // Get the data of an image
  Camera.getPicture(options).then((imagePath) => {
    // Special handling for Android library
    if (this.platform.is('android') && sourceType === Camera.PictureSourceType.PHOTOLIBRARY) {
      FilePath.resolveNativePath(imagePath)
        .then(filePath => {
          let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
          let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
          this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
        });
    } else {
      var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
      var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
      this.copyFileToLocalDir(correctPath, currentName, this.createFileName());
    }
  }, (err) => {
    this.presentToast('Error while selecting image.');
  });
}

private createFileName() {
  var d = new Date(),
  n = d.getTime(),
  newFileName =  n + ".jpg";
  return newFileName;
}
 
// Copy the image to a local folder
private copyFileToLocalDir(namePath, currentName, newFileName) {
  File.copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(success => {
    this.lastImage = newFileName;

 var url = "http://bestoffershops.com/bestoffersApi/saveImage";
 
  // File for Upload
  var targetPath = this.pathForImage(this.lastImage);
 
  // File name only
  var filename = this.lastImage;
 
  var options = {
    fileKey: "file",
    fileName: filename,
    chunkedMode: false,
    mimeType: "multipart/form-data",
    params : {'fileName': filename},
  };
 
  const fileTransfer = new Transfer();
 
  this.loading = this.loadingCtrl.create({
    content: 'Uploading...',
  });
  this.loading.present();
 
  // Use the FileTransfer to upload the image
  fileTransfer.upload(targetPath, url, options).then(data => {
    this.loading.dismissAll() 
    this.presentToast('Image succesful uploaded.');
  
    this.navCtrl.setRoot(this.navCtrl.getActive().component());
  }, err => {
    this.loading.dismissAll()
    this.presentToast('Error while uploading file.');
  });

this.storage.get('userid').then((userid) => {
      this.usrid = userid;

      var bodyString = 'id=' + this.usrid + '&filename=' + filename;
    // Set content type to JSON
    var headers = new Headers();
    headers.append("Accept", 'application/x-www-form-urlencoded');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    // Create a request option
    let options = new RequestOptions({ headers: headers });
this.http.post('http://bestoffershops.com/bestoffersApi/updateImage', bodyString, options).map(res => res.json()).subscribe(data => {
      
      this.navCtrl.setRoot(this.navCtrl.getActive().component);
}),
err => this.presentToast(err);
})
  }, error => {
    this.presentToast('Error while storing file.');
  });
}
 
private presentToast(text) {
  let toast = this.toastCtrl.create({
    message: text,
    duration: 3000,
    position: 'top'
  });
  toast.present();
}
 
// Always get the accurate path to your apps folder
public pathForImage(img) {
  if (img === null) {
    return '';
  } else {
    return cordova.file.dataDirectory + img;
  }
}
back(){
  this.navCtrl.push(Signin);
}
logout(){
 this.storage.set("signed", false);
  this.navCtrl.push(Login);
}
editprofile(){
  this.navCtrl.push(Editprofile);
}
}
