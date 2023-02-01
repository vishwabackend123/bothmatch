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
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/login", data).subscribe(
        (data) => { 
          // localStorage.setItem('loginToken', data.data.loginToken)          
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
      this.requestService.post("account/updateUserDetails", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  // verifyToken(){
  //   return new Promise((resolve, rejects) => {
  //     this.requestService.post("account/verify_token/").subscribe(
  //       (data) => {
  //         resolve(data);
  //       },
  //       (error) => {
  //         rejects(error);
  //       }
  //     );
  //   });
  // }

  verifyOtp(data: any){
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/verifyOtp", data).subscribe(
        (data) => {
          localStorage.setItem('loginToken', data.data.loginToken)
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  getUser(){ debugger
    return new Promise((resolve, rejects) => {
      this.requestService.get("account/getUserData").subscribe(
        (data) => {
          if(data.code=="401") this.logout()
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
      this.requestService.post("account/forgetPassword", data).subscribe(
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
      this.requestService.post("account/resetPassword", data).subscribe(
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
      this.requestService.post("account/registerUser", data).subscribe(
        (data) => {
          localStorage.setItem('loginToken', data.data.logintoken)
          console.log('tokentoken', data.data.loginToken);
          
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }

  userExitOrNot(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/checkUserExitsOrNot", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }


  resendOtpPass(data: any) {
    return new Promise((resolve, rejects) => {
      this.requestService.post("account/resendOtp", data).subscribe(
        (data) => {
          resolve(data);
        },
        (error) => {
          rejects(error);
        }
      );
    });
  }


  setUserToken(token: any, user: any, data: any = null) {
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
