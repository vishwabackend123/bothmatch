import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { RequestService } from './request.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData:any = undefined;
  constructor(
    public requestService: RequestService,
    public apiService: ApiService
  ) {}


  userLogin(data: any) {
    debugger
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/login/", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  userDataUpdate(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("userprofile/update_user/", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  verifyToken(){
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/verify_token/").subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  getUser(){
    return new Promise((resolve, rejects) => {
      this.requestService.post("userprofile/get_user_data/").subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  forgotPassword(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/forget_password/", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }


  resetPassword(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/reset_password/", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  userRegister(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/register/", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }


  setUserToken(token: any, user: any,) {
    localStorage.setItem('loginToken', token);
    localStorage.setItem('isLoggedIn', user);
  }

  logout() {
    localStorage.removeItem('loginToken')
    localStorage.removeItem('isLoggedIn')
    localStorage.removeItem('tabOuter');
    localStorage.removeItem('tabInner');
  }


}
