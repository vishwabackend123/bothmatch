import { AbstractControl } from '@angular/forms';

export function ValidateUrl(control: AbstractControl) { 
  
  if(control.value!=""){
    if (!control.value.startsWith('https://www.linkedin.com') && !control.value.startsWith('www.linkedin.com') && !control.value.startsWith('linkedin.com') ) {
    return { invalidUrl: true };
  }
  }
  return null;
}

export function ValidateJobrepUrl(control: AbstractControl) { 
  if(control.value!=""){
  if (!control.value.startsWith('https://jobrep.com') && !control.value.startsWith('www.jobrep.com') && !control.value.startsWith('jobrep.com')) {
    return { invalidJobrepUrl: true };
  }}
  return null;
}

export function ValidateBothMatchUrl(control: AbstractControl) {
  if(control.value!=""){
  if (!control.value.startsWith('https://bothmatch.com') && !control.value.startsWith('www.bothmatch.com') && !control.value.startsWith('bothmatch.com')) {
    return { invalidBothMatchpUrl: true };
  }}
  return null;
}
