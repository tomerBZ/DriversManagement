import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-drivers-table',
  templateUrl: './drivers-table.component.html',
  styleUrls: ['./drivers-table.component.scss']
})
export class DriversTableComponent implements OnInit {
  drivers: any;
  constructor(private _firebase: FirebaseService) { }

  ngOnInit() {
    this.drivers = this._firebase.drivers;
  }

}
