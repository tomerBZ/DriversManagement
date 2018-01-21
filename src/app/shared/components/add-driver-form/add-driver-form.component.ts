import { Component, ElementRef, EventEmitter, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../../services/validation/validation.service';
import { MapsAPILoader } from '@agm/core';
import {} from '@types/googlemaps';
import { FirebaseService } from '../../services/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { UniversalValidators } from 'ngx-validators';
declare const google: any;

@Component({
  selector: 'app-add-driver-form',
  templateUrl: './add-driver-form.component.html',
  styleUrls: ['./add-driver-form.component.scss'],
  styles: [`
    agm-map {
      height: 300px;
    }
  `],
})
export class AddDriverFormComponent implements OnInit {
  formErrors: any;
  id: string;
  driver: any;
  public latitude: number;
  public longitude: number;
  public zoom: number;
  @Output() close = new EventEmitter();
  addDriverForm: FormGroup;
  @ViewChild('search')
  public searchElementRef: ElementRef;

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
  }

  buildForm(): void {
    this.addDriverForm = this.builder.group({
      'name': [null, [Validators.required, Validators.pattern('^[a-zA-Z !\'-]*$')]],
      'phone': [null, [Validators.required, Validators.pattern('^[0-9 !\+-]*$'), Validators.minLength(11)]],
      'email': [null, [Validators.required, Validators.email]],
      'address': [null, [Validators.required]]
    });
    this.addDriverForm.valueChanges.subscribe(data => this._validation.onValueChanged(data, this.addDriverForm, 'addDriver'));
    this._validation.onValueChanged(null, this.addDriverForm, 'addDriver');
  }

  formSubmit(form: FormGroup) {
    if (form.status === 'VALID' && this.addDriverForm.touched) {
      // this.spinner = true;
      this._firebase.addDriver(form.value);
      this.close.emit();
    }
  }

  ngOnInit() {
    // Build Form && Get errors
    this.formErrors = this._validation.formErrors;
    this.buildForm();
    // set google maps defaults
    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    // set current position
    this.setCurrentPosition();

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
          this.addDriverForm.get('address').setValue(place.formatted_address);
        });
      });
    });
  }

  private setCurrentPosition() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 12;
      });
    }
  }
  closeMe() {
    this.close.emit();
  }
}
