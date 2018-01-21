import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ValidationService {
  formErrors = {
    email: '',
    name: '',
    gender: '',
    phone: '',
    address: '',
  };
  validationMessages = {
    'addDriver': {
      'address': {
        'required': 'Address is required.'
      },
      'email': {
        'email': 'You Must Enter A Valid Email',
        'required': 'Email is required.',
      },
      'name': {
        'pattern': 'You Must Enter Only Alpha Characters',
        'required': 'Email is required.',
      },
      'phone': {
        'required': 'You Must Enter A Phone',
        'pattern': 'Only Digits + and -',
        'minlength': 'Minimum 11 digits.',
      }
    }
  };

  constructor() {
  }

  onValueChanged(data ?: string, formToValidate ?: FormGroup, formName ?: string) {
    if (!formToValidate) {
      return;
    }
    for (const field in this.formErrors) {
      if (this[field] !== 0) {
        this.formErrors[field] = '';
        const control = formToValidate.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[formName][field];
          for (const key in control.errors) {
            if (this[field] !== 0) {
              if (control.errors.hasOwnProperty(key)) {
                this.formErrors[field] += messages[key] + ' ';
              }
            }
          }
        }
      }
    }
  }
}
