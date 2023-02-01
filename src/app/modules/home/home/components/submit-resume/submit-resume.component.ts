import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-submit-resume',
  templateUrl: './submit-resume.component.html',
  styleUrls: ['./submit-resume.component.scss']
})
export class SubmitResumeComponent implements OnInit {
  siteKey: any;

  constructor() {
    this.siteKey = environment.siteKey
   }

  ngOnInit(): void {
  }

}
