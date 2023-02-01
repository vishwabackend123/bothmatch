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
      this.apiService.httpPostForUplaod("account/saveImageFile", data).subscribe(
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
      this.requestService.get("account/getExpertiseDetails").subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  getExpertiseWithoutAuth() {
    return new Promise((resolve, rejects) => {
      this.requestService.get("account/getExpertiseWithoutAuth").subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  getAllExpertis() {
    return new Promise((resolve, rejects) => {
      this.requestService.get("account/getAllMatch").subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  getAllUsers() {
    return new Promise((resolve, rejects) => {
      this.requestService.get("account/getApprovedUser").subscribe(
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
      this.requestService.post("account/updateExpertise", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  filterCareerProfessional(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/filterSkills", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  // resumeUpload(data: any) {
  //   return new Promise((resolve, rejects) => {
  //     this.apiService.httpPostForUplaod("govt_match_app/uploadResume", data).subscribe(
  //       (data) => {
  //         resolve(data);
  //       },
  //       (error) => {
  //         rejects(error);
  //       }
  //     );
  //   });
  // }
}
