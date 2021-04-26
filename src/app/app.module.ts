import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database';
import {FirebaseService} from './services/firebase.service';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {FlexModule} from '@angular/flex-layout';
import {HttpClientModule} from '@angular/common/http';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import { VerifyemailaddressComponent } from './verifyemailaddress/verifyemailaddress.component';
import {ImageCropperModule} from 'ngx-image-cropper';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    LandingPageComponent,
    UserPageComponent,
    VerifyemailaddressComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    MatCardModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FlexModule,
    HttpClientModule,
    ImageCropperModule
  ],
  providers: [FirebaseService],
  bootstrap: [AppComponent]
})
export class AppModule { }
