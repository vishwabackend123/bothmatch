import { Injectable, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  userData: any;
  isLoggedIn: any;
  constructor(
    private datePipe: DatePipe,
    public auth: AuthService
  ) {
    this.checkVerifyToken();
    this.isLoggedIn = localStorage.getItem('isLoggedIn');
  }

  transformDate(date: any, sequence = 'MMM dd, yyyy') {
    return this.datePipe.transform(date, sequence);
  }


  confirmBox(msg = '', confirmBtn = '', cancel = '', textOp?: string) {
    return new Promise((resolve, rejects) => {
      Swal.fire({
        title: msg,
        icon: 'warning',
        text: textOp,
        showCancelButton: true,
        confirmButtonText: confirmBtn,
        cancelButtonText: cancel
      }).then((result) => {
        if (result.value) {
          resolve(true);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          result.isDismissed
          rejects(false)
        }
      })
    });
  }

  getUserData() {
    return new Promise((resolve, rejects) => {
      this.auth.getUser().then((data: any) => {
        if (data && data.success) {
          this.userData = data.data;
          resolve(this.userData);
        }
        else if (data && data.message === "Token has Expired") {
          this.auth.logout();
          rejects(data)
        }
        else {
          rejects(data.data)
        }
      }).catch((err: any) => {
        rejects(err)
      })
    })
  }

  checkVerifyToken() {
    this.auth.verifyToken().then((res: any) => {
      if (res && res.success) {
        this.auth.logout();
      }
      else {
        console.log('false');
      }
    }).catch((err: any) => {
      console.log(err);
    })
  }

}
