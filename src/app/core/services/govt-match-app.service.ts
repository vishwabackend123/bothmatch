import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class GovtMatchApp {

  constructor(
    public apiService: ApiService,
    public requestService: RequestService,
  ) { }

  resumeUpload(data: any) {
    return new Promise((resolve, rejects) => {
      this.apiService.httpPostForUplaod("govt_match_app/uploadResume", data).subscribe(
        (res) => {
          resolve(res);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }
  wordTypeChange(data: any) {
    ;
    return new Promise((resolve, rejects) => {
      this.requestService.post("govt_match_app/updateToExclude", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }
  additionalInput(data: any) {
    ;
    return new Promise((resolve, rejects) => {
      this.requestService.post("govt_match_app/additionalInputs", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }
  getReviewWords(data: any) {
    ;
    return new Promise((resolve, rejects) => {
      this.requestService.post("govt_match_app/getReviewWords", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }
  getCurateMatchJobs(data: any) { 
    return new Promise((resolve, rejects) => {
      this.requestService.post("govt_match_app/getCurateMatchJobs", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

}
 

