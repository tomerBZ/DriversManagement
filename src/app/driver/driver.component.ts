import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ValidationService } from '../shared/services/validation/validation.service';
import { MapsAPILoader } from '@agm/core';
import { FirebaseService } from '../shared/services/firebase/firebase.service';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {
  id: string;
  driver: any;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  constructor(private mapsAPILoader: MapsAPILoader,
              private ngZone: NgZone,
              private builder: FormBuilder,
              private _validation: ValidationService,
              private _firebase: FirebaseService,
              private activatedRoute: ActivatedRoute) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.email;
      this._firebase.getDriver(this.id).subscribe(driver => {
        this.driver = driver;
      });
    });
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
  }

  ngOnInit() {
  }

}
