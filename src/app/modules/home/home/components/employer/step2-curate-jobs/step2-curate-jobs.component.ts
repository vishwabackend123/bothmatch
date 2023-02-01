import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-step2-curate-jobs',
  templateUrl: './step2-curate-jobs.component.html',
  styleUrls: ['./step2-curate-jobs.component.scss']
})
export class Step2CurateJobsComponent implements OnInit {
  Arr = Array; //Array type captured in a variable
  num:number = 20;
  siteKey: any = "6LcD6aAcAAAAAFucR0IcVnwv4AuVDve7wEbN0dnd";
  @Output() changeTab = new EventEmitter<number>();
  constructor() { }
  services = [{ name: 'Benefits' },
  { name: 'Certification' },
  { name: 'Company Size' },
  { name: 'Education' },
  { name: 'Flexible Hours' },
  { name: 'Industry' },
  { name: 'Job Category' },
  { name: 'Job Level' },
  { name: 'Job Radius' },
  { name: 'Job Title' },
  { name: 'Job Type' },
  { name: 'Language' },
  { name: 'Learning' },
  { name: 'Location' },
  { name: 'No Travel' },
  { name: 'No Vaccine' },
  { name: 'Salary' }]
  ngOnInit(): void {
  }
  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }
  submitForm(){
    this.tabChange(3)
  }
}
