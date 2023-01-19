import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'us-company-match-step3-form',
  templateUrl: './us-company-match-step3-form.component.html',
  styleUrls: ['./us-company-match-step3-form.component.scss']
})
export class USCompanyMatchStep3FormComponent implements OnInit {
  siteKey: any = "6LcD6aAcAAAAAFucR0IcVnwv4AuVDve7wEbN0dnd";
  step3Form!: FormGroup;

  constructor(private fb: FormBuilder,) { }

  ngOnInit(): void {
    this.step3Form = this.fb.group({
      recaptcha: ['', Validators.required]
    })
  }
  get getControls() {
    return this.step3Form.controls
  }
  submitForm(){}
}
