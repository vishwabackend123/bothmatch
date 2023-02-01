import { Directive } from '@angular/core';
import { AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[linkedInValidator]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: LinkedInValidatorDirective,
    multi: true
  }]
})
export class LinkedInValidatorDirective implements Validator {
  validate(control: AbstractControl) : {[key: string]: any} | null {
    if (control.value && control.value.includes("linkedin.com")== false) {
      return { 'linkedInInvalid': true };
    }
    return null;
  }
}