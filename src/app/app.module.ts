import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';

// used to create fake backend
import { fakeBackendProvider } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AppComponent } from './app.component';
import { AlertComponent } from './_components';
import { HomeComponent } from './home';
import axios from 'axios';




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';


// 1. Import the libs
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import Axios from 'axios';


const config = {
    apiKey: "AIzaSyAj2CGshlFX4iMlYgQ4HEq0Zp9IjZa7ZTs",
    authDomain: "sa-sea-dev.firebaseapp.com",
    databaseURL: "https://sa-sea-dev.firebaseio.com",
    projectId: "sa-sea-dev",
    storageBucket: "sa-sea-dev.appspot.com",
    messagingSenderId: "773389226150",
    appId: "1:773389226150:web:3db737a92421fb77966467",
    measurementId: "G-1C42DGRV2T"
};

@NgModule({
    imports: [
        BrowserModule,
        NgSelectModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule,
        MatIconModule,
        MatSelectModule,
        FormsModule,
        
        AngularFireModule.initializeApp(config),
        AngularFirestoreModule, // firestore
        AngularFireAuthModule, // auth
        AngularFireStorageModule // storage

        
    ],
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        
        
        
            ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // provider used to create fake backend
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { };