import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidationService } from '../shared/services/validation/validation.service';
import { FirebaseService } from '../shared/services/firebase/firebase.service';
import { ActivatedRoute } from '@angular/router';
import { RouterService } from '../shared/services/router/router.service';
import { } from '@types/googlemaps';
import { MapsAPILoader } from '@agm/core';
import { UniversalValidators } from 'ngx-validators';
declare const google: any;

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  id: string;
  driver: any;
  formErrors: any;
  @ViewChild('search')
  public searchElementRef: ElementRef;
  constructor(private mapsAPILoader: MapsAPILoader,
              private _validation: ValidationService,
              private ngZone: NgZone,
              private builder: FormBuilder,
              private _firebase: FirebaseService,
              private activatedRoute: ActivatedRoute,
              private _router: RouterService) {
    this.activatedRoute.params.subscribe(params => {
      this.id = params.email;
      this._firebase.getDriver(this.id).subscribe(driver => {
        this.driver = driver;
        this.editForm.setValue(this.driver);
      });
    });
  }


  ngOnInit() {
    // Build Form && Get errors
    this.formErrors = this._validation.formErrors;
    this.buildForm();
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

          // set input value from API
          this.editForm.get('address').setValue(place.formatted_address);
        });
      });
    });
  }

  formSubmit(form: FormGroup) {
    if (form.status === 'VALID' && this.editForm.touched) {
      this._firebase.addDriver(form.value);
      this._router.navigateTo('Driver', this.driver.email);
    }
  }

  buildForm(): void {
    this.editForm = this.builder.group({
      'name': [null, Validators.required],
      'phone': [null, [Validators.required, Validators.pattern('^[0-9 !\+-]*$'), UniversalValidators.min(11)]],
      'email': [null, [Validators.required, Validators.email]],
      'address': [null, [Validators.required]]
    });
    this.editForm.valueChanges.subscribe(data => {
      this._validation.onValueChanged(data, this.editForm, 'addDriver');
    });
    this._validation.onValueChanged(null, this.editForm, 'addDriver');
  }
}
