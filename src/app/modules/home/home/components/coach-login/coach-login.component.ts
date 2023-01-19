import { Component, Output, OnInit, EventEmitter, ElementRef, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CapchaVerifyService } from 'src/app/core/services/capcha-verify.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CustomValidators } from 'src/app/core/services/providers/CustomValidators';

@Component({
  selector: 'app-coach-login',
  templateUrl: './coach-login.component.html',
  styleUrls: ['./coach-login.component.scss']
})
export class CoachLoginComponent implements OnInit, OnChanges {
  Loginform!: FormGroup;
  ForgotPsdform!: FormGroup;
  forLoad: boolean;
  isLoader: boolean = false;
  checkToken: any;
  submitted = false;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  @Output() changeTab = new EventEmitter<any>();
  @Input() userData: any;


  constructor(
    private fb: FormBuilder,
    public captcha: CapchaVerifyService,
    public toast: ToastrService,
    public router: Router,
    public auth: AuthService,
    public fun: FunctionService,
    private modalService: NgbModal
  ) {
    this.checkToken = localStorage.getItem('isLoggedIn')
  }

  ngOnInit() {
    this.formData();
    this.formForgotData();
    this.captcha.addRecaptchaScript(this.recaptchaElement.nativeElement);
  }

  ngOnChanges(changes:any = this.userData): void {
    this.fun.userData = changes.userData.currentValue;
  }

  tabChange(tab: any) {
    this.changeTab.emit(tab);
  }

  formData() {
    this.Loginform = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/, { hasSpecialCharacters: true }),
      ]],
      fullname: ["", Validators.required],
    })
  }
  formForgotData() {
    this.ForgotPsdform = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
    })
  }

  submitLogin() {
    debugger
    this.Loginform.markAllAsTouched();
    if (this.Loginform.valid) {
      this.isLoader = true;
      if (this.captcha.verifyCaptcha != null) {
        debugger
        this.auth.userLogin(this.Loginform.value).then((res: any) => {
          debugger
          if (res && res.success) {
            this.auth.setUserToken(res.data.loginToken, res.success)
            this.isLoader = false;
            this.checkToken = res.success;
            this.fun.isLoggedIn = true
            this.Loginform.reset();
            this.toast.success('User login successfully');
            this.changeTab.emit(1);
          }
          else if (res && res.message === "User does not exists") {
            this.fun.confirmBox('No user exists.', 'Register', 'Cancel', 'Do you want to register a new account using these credentials?').then((msg: any) => {
              this.isLoader = false
              if (res) {
                this.auth.userRegister(this.Loginform.value).then((user: any) => {
                  console.log('user =>', user);
                  if (user && user.success) {
                    this.auth.setUserToken(user.data.logintoken, user.success)
                    this.Loginform.reset();
                    this.fun.isLoggedIn = true
                    this.toast.success(`User register ${user.message}`);
                    this.changeTab.emit(1);
                  }
                  else {
                    this.toast.error('Unknown Error');
                  }
                }).catch((err: any) => {
                  console.log('err => ', err);
                  this.toast.error(err.message);
                })
              }
            }).catch((err: any) => {
              this.isLoader = false
              this.toast.error('Canceled')
            })

          }
          else {
            this.toast.error(res.message);
            this.isLoader = false
          }
        }).catch((err: any) => {
          this.toast.error(err.message)
          this.isLoader = false
        })
      } else {
        this.toast.error('Verify captcha is required')
        this.isLoader = false
      }
    }
    else {
      this.isLoader = false
    }
  }


  logout() {
    this.fun.confirmBox("Are sure logout?", "Yes", "Cancel").then((res: any) => {
      if (res) {
        this.auth.logout();
        this.checkToken = false;
      }
      else {
        this.toast.error('Canceled');
      }
    }).catch((err: any) => {
      console.log('err => ', err);
      this.toast.error('Canceled')
    })
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  forgotPsd(content2: any) {
    this.ForgotPsdform.markAllAsTouched();
    if (this.ForgotPsdform.valid) {
      this.forLoad = true
      this.auth.forgotPassword(this.ForgotPsdform.value).then((res: any) => {
        if (res && res.success) {
          this.forLoad = false
          this.toast.success(res.message);
          // this.ForgotPsdform.reset();
          this.modalService.open(content2, { centered: true, backdrop: 'static' });
        }
        else {
          this.toast.error(res.message);
          this.ForgotPsdform.reset();
          this.forLoad = false
          this.modalService.dismissAll();
        }
      }).catch((err: any) => {
        console.log(err);
        this.toast.error(err.message);
        this.forLoad = false
        this.ForgotPsdform.reset();
        this.modalService.dismissAll();
      })
    }
  }

  close() {
    this.modalService.dismissAll();
  }

  registerUser() {
    this.Loginform.markAllAsTouched();
    if (this.Loginform.valid) {
      if (this.captcha.verifyCaptcha != null) {
        this.auth.userRegister(this.Loginform.value).then((user: any) => {
          if (user && user.success) {
            this.auth.setUserToken(user.data.logintoken, user.success)
            this.toast.success(`User register ${user.message}`);
            this.Loginform.reset();
            this.fun.isLoggedIn = true
            this.changeTab.emit(1);
          }
          else {
            this.toast.error(user.message);
          }
        }).catch((err: any) => {
          console.log('err => ', err);
          this.toast.error(err.message);
        })
      }
      else {
        this.toast.error('Verify captcha is required')
        this.isLoader = false
      }
    }
    else {
      this.isLoader = false
    }
  }
}


