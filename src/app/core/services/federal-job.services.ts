import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class FederalJobServices {

  constructor(
    public apiService: ApiService,
    public requestService: RequestService,
  ) { }


  getReviewWords(data: any) {
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
}
