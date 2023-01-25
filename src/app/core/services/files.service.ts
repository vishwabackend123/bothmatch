import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class FilesService {

  constructor(
    public apiService: ApiService,
    public requestService: RequestService,
  ) { }


  userFileUpload(data: any) {
    return new Promise((resolve, rejects) => {
      this.apiService.httpPostForUplaod("userprofile/upload_image/", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  resumeUpload(data: any) {
    return new Promise((resolve, rejects) => {
      debugger
      this.apiService.httpPostForUplaod("dev/govt_match_app/uploadResume", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  getExpertise() {
    return new Promise((resolve, rejects) => {
      this.requestService.post("userprofile/get_user_expertise/").subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  updateExpertise(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("userprofile/update_user_expertise/", data).subscribe(
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
