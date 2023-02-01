import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilesService } from 'src/app/core/services/files.service';
import { FunctionService } from 'src/app/core/services/function.service';

@Component({
  selector: 'app-coach-expertise',
  templateUrl: './coach-expertise.component.html',
  styleUrls: ['./coach-expertise.component.scss']
})
export class CoachExpertiseComponent implements OnInit, OnChanges {
  allExpertise: any = [];
  isLoader: boolean = false
  allData: any = [];
  allExpertiseDefult: any = []
  lastDate:any = '';
  @Input() userData: any;
  constructor(
    public fileService: FilesService,
    public auth: AuthService,
    public toast: ToastrService,
    public fun: FunctionService
  ) { }


  ngOnInit() {
    if(this.fun.isLoggedIn){
      this.getExpertize();
    }else{
      this.getExpertizeWithoutAuth()
    }
  }

  getExpertize() {
    this.fileService.getExpertise().then((res: any) => {
      if (res && res.status) {
        this.allExpertise = res.data.data;
        this.allExpertise.sort(function(a, b) {
          return a.id - b.id;
        });
        let allUpdateDate:any = []
        if(this.allExpertise && this.allExpertise.length > 0){
          this.allExpertise.forEach(element => {
            if(element && element.updated_at){
              allUpdateDate.push(element.updated_at)
            }
          });
          if(allUpdateDate && allUpdateDate.length > 0){
            const maxDate = new Date(Math.max(...allUpdateDate.map(element => {return new Date(element);}),),);
            // this.lastDate = this.fun.transformDate(maxDate[res.data.data.length-1].updated_at, 'MMM d y');
            this.lastDate = this.fun.transformDate(maxDate, 'MMM d y');
          }
        }
      }
      else if(res && res.message === "Token has Expired"){
        this.auth.logout();
        window.location.reload();
      }
      else {
        console.log('Err somthing went wrong');
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

  getExpertizeWithoutAuth() {
    this.fileService.getExpertiseWithoutAuth().then((res: any) => {
      if (res && res.status) {
        let data= res.data.data;
        const unique = [...new Map(data.map((m) => [m.service_name, m])).values()];
        this.allExpertiseDefult = unique
      }
      else {
        console.log('Err somthing went wrong');
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

  ngOnChanges(): void {
    if(this.fun.isLoggedIn){
      this.getExpertize();
    }else{
      this.getExpertizeWithoutAuth()
    }
  }

  viewCareerCoaches() {
    this.isLoader = true;
    let data = { expertiseDetails: this.allData }
    this.fileService.updateExpertise(data).then((res: any) => {
      console.log(res);
      this.isLoader = false
      if (res && res.status) {
        // this.toast.success('Expertise Level Updated Successfully');
        this.lastDate = this.fun.transformDate(res.data.data, 'MMM d y');
        console.log(this.lastDate);
      }
      else {
        this.isLoader = false
        this.toast.error(res.message)
      }
    }).catch((err: any) => {
      console.log(err);
      this.isLoader = false
      if(err&& err.message === "Invalid Params"){
        this.toast.error('Please Select Expertise Level')
      }else{
        this.toast.error(err.message)
      }
    })
  }

  expertiseChange(data: any, id) {
    let obj = { expertise_level: id, service_id: data.service_id }
    this.allData = this.allData.filter(item => item.service_id !== data.service_id);
    this.allData.push(obj);
  }

}
