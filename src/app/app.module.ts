import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

// Paste in your credentials that you saved earlier
const firebaseConfig = {
  apiKey: 'AIzaSyB48xzIWfMx3gyUozWkdsHQ11RTE5r195A',
  authDomain: 'animated-verve-108110.firebaseapp.com',
  databaseURL: 'https://animated-verve-108110.firebaseio.com',
  projectId: 'animated-verve-108110',
  storageBucket: 'animated-verve-108110.appspot.com',
  messagingSenderId: '465648677714'
};

import {
  MatNativeDateModule,
  MatSelectModule,
  MatCardModule,
  MatInputModule,
  MatIconModule,
  MatCheckboxModule,
  MatButtonModule,
  MatDatepickerModule,
  MatSidenavModule,
  MatTableModule,
  MatTabsModule,
  MatProgressSpinnerModule,
  MatStepperModule,
  MatRadioModule,
  MatButtonToggleModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { DriverComponent } from './driver/driver.component';
import { AddDriverDialogComponent } from './shared/components/add-driver-dialog/add-driver-dialog.component';
import { ValidationService } from './shared/services/validation/validation.service';
import { AddDriverFormComponent } from './shared/components/add-driver-form/add-driver-form.component';
import { AddComponent } from './add/add.component';
import { ListComponent } from './list/list.component';
import { FirebaseService } from './shared/services/firebase/firebase.service';
import { DriversTableComponent } from './shared/components/drivers-table/drivers-table.component';
import { RouterService } from './shared/services/router/router.service';
import { EditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FooterComponent,
    SidebarComponent,
    NavbarComponent,
    DriverComponent,
    AddDriverDialogComponent,
    AddDriverFormComponent,
    AddComponent,
    ListComponent,
    DriversTableComponent,
    EditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCardModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatTableModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatRadioModule,
    MatButtonToggleModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDNM9tUvoTiMh5yj7mfWXiNFq4zl8jWJkQ',
      libraries: ['places']
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [ValidationService, FirebaseService, RouterService],
  bootstrap: [AppComponent],
  entryComponents: [AddDriverDialogComponent]
})
export class AppModule {
}
