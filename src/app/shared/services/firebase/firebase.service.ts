import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Driver } from '../../interfaces/driver';

@Injectable()
export class FirebaseService {
  driversCol: AngularFirestoreCollection<Driver>;
  drivers: Observable<Driver[]>;
  driverDoc: AngularFirestoreDocument<Driver>;
  driver: Observable<Driver>;

  constructor(private _afs: AngularFirestore) {
    this.driversCol = this._afs.collection('drivers');
    this.drivers = this.driversCol.valueChanges();
  }

  addDriver(data) {
    this._afs.collection('drivers')
      .doc(data.email)
      .set({'name': data.name, 'email': data.email, 'phone': data.phone, 'address': data.address});
  }

  getDriver(email: any) {
    this.driverDoc = this._afs.doc('drivers/' + email);
    this.driver = this.driverDoc.valueChanges();
    return this.driver;
  }
}
