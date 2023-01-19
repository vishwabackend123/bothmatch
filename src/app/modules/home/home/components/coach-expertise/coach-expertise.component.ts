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
  allData: any = [];
  lastDate:any = '';
  @Input() userData: any;
  constructor(
    public fileService: FilesService,
    public auth: AuthService,
    public toast: ToastrService,
    public fun: FunctionService
  ) { }

  ngOnInit() {
    this.getExpertize();
  }

  getExpertize() {
    this.fileService.getExpertise().then((res: any) => {
      if (res && res.success) {
        this.allExpertise = res.data;
        this.allExpertise.sort(function(a, b) {
          return a.id - b.id;
        });
        let maxDate = res.data.sort((a, b) => a.updated_at - b.updated_at);
        this.lastDate = this.fun.transformDate(maxDate[res.data.length-1].updated_at, 'MMM d y');
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

  ngOnChanges(): void {
    this.getExpertize();
  }

  viewCareerCoaches() {
    let data = { expertiseList: this.allData }
    this.fileService.updateExpertise(data).then((res: any) => {
      console.log(res);
      if (res && res.success) {
        this.toast.success(res.message);
        this.lastDate = this.fun.transformDate(res.data, 'MMM d y');;
      }
      else {
        this.toast.error(res.message)
      }
    }).catch((err: any) => {
      console.log(err);
      this.toast.error(err.message)
    })
  }

  expertiseChange(data: any, id) {
    let obj = { expertise_level: id, service_id: data.service_id }
    this.allData = this.allData.filter(item => item.service_id !== data.service_id);
    this.allData.push(obj);
  }

}
