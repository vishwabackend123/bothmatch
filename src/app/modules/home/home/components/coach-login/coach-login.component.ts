import {
  Component,
  Output,
  OnInit,
  EventEmitter,
  ElementRef,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
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
  styleUrls: ['./coach-login.component.scss'],
})
export class CoachLoginComponent implements OnInit, OnChanges {
  Loginform!: FormGroup;
  otpForm!: FormGroup;
  ForgotPsdform!: FormGroup;
  resentForm!: FormGroup;
  forLoad: boolean;
  resgisterCheck: boolean = false;
  loginCheck: boolean = false
  isUserVerify: boolean = false
  isLoader: boolean = false;
  isVerifyLoader: boolean = false
  isRegisterLoader: boolean = false
  isResendLoader: boolean = false
  submitted = false;
  @ViewChild('recaptcha', { static: true }) recaptchaElement: ElementRef;
  @ViewChild('reUser', { static: true }) userEle: ElementRef;
  @Output() changeTab = new EventEmitter<any>();
  @Input() userData: any;
  @Input() userType: any;
  loginLoad: boolean;

  constructor(
    private fb: FormBuilder,
    public captcha: CapchaVerifyService,
    public toast: ToastrService,
    public router: Router,
    public auth: AuthService,
    public fun: FunctionService,
    private modalService: NgbModal
  ) {
    this.fun.checkToken = localStorage.getItem('isLoggedIn');
  }

  ngOnInit() {
    this.formData()
    this.formForgotData();
    this.otpData();
    this.resendData()
    this.captcha.addRecaptchaScript(this.recaptchaElement.nativeElement);
    // if(this.fun.isLoggedIn && this.fun.isLoggedIn == true){
      this.patchLoginData() 
    // }
    // this.isUserVerify ? this.patchLoginData() : ''

    console.log('user type testing',this.userType);
  }

  ngOnChanges(changes: any = this.userData): void {
    this.isUserVerify ? this.fun.userData = changes.userData.currentValue : " "
  }

  tabChange(tab: any) {
    this.changeTab.emit(tab);
  } 
  formData() {
    this.Loginform = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[A-Za-z0-9._%+-]{3,}@[a-zA-Z]{3,}([.]{1}[a-zA-Z]{2,}|[-.]{1}[a-zA-Z]{2,}[.]{1}[a-zA-Z]{2,})')]],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          CustomValidators.patternValidator(/\d/, { hasNumber: true }),
          CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
          CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
          CustomValidators.patternValidator(
            /[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/,
            { hasSpecialCharacters: true }
          ),
        ],
      ],
      fullname: [''],
    });
  }

  keyPress(event: KeyboardEvent) {
    let value = (<HTMLInputElement>event.target).value;
    this.Loginform.patchValue({email: value})
    if(
      this.Loginform && 
      this.Loginform.controls && 
      this.Loginform.controls.email && 
      this.Loginform.controls.email.valid
    ){
      let value = {email: this.Loginform.value.email}
      if(value){
        this.auth.userExitOrNot(value).then((res:any)=>{
          if(res && res.status){
            this.loginCheck = res.status
            this.resgisterCheck = false
          }
          else{
            this.resgisterCheck = true
            this.loginCheck = res.status
          }
          event.preventDefault();
        }).catch(err =>{
          this.resgisterCheck = false
          this.loginCheck = false
          console.log('Erro => ', err);
        })
      }
    }
  }


  otpData() {
    this.otpForm = this.fb.group({
      emailOtp: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      otp: ['', Validators.required]
    });
  }

  resendData() {
    this.resentForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    });
  }

  formForgotData() {
    this.ForgotPsdform = this.fb.group({
      email: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
    });
  }

  patchLoginData(){
    try{
      this.fun.getUserData().then((res:any)=>{
        if(res){
          this.Loginform.get('email').setValue(res.email);
          this.Loginform.get('password').setValue('Q****1**f');
          this.Loginform.get('fullname').setValue(res.name);
        }
      }).catch(err =>{
        
        console.log("eee => ", err);
      })
    }catch (e){
     
    }
  }

  submitLogin() { 
    this.Loginform.markAllAsTouched();
    if (this.Loginform.valid) {
      this.isRegisterLoader = false;
      this.isLoader = true;
      if (this.captcha.verifyCaptcha != null) {
        this.auth
          .userLogin(this.Loginform.value)
          .then((res: any) => {
            if (res && res.status) {
              this.isRegisterLoader = false;
              this.isLoader = false;
              this.isUserVerify = true
              this.otpForm.patchValue({emailOtp: res.data.userDetails.email})
              this.toast.success(`${res.message}`);
              window['grecaptcha'].reset();
              if(this.userEle.nativeElement.innerHTML == ''){
                this.captcha.addRecaptchaScript(this.userEle.nativeElement);
              }
              this.captcha.verifyCaptcha = null
            } else if (res && res.message === 'User does not exists') {
              this.fun
                .confirmBox(
                  'No user exists.',
                  'Register',
                  'Cancel',
                  'Do you want to register a new account using these credentials?'
                )
                .then((msg: any) => {
                  this.isLoader = false;
                  this.isRegisterLoader = true;
                  if (res) {
                    this.auth.userRegister(this.Loginform.value)
                      .then((user: any) => {
                        if (user && user.status) {
                          this.isLoader = false;
                          this.isRegisterLoader = false;
                          this.isUserVerify = true
                          window['grecaptcha'].reset();
                          if(this.userEle.nativeElement.innerHTML == ''){
                            this.captcha.addRecaptchaScript(this.userEle.nativeElement);
                          }
                          this.otpForm.patchValue({emailOtp: this.Loginform.value.email})
                          this.captcha.verifyCaptcha = null
                          this.toast.success(`${user.message}`);
                        } else {
                          this.isLoader = false;
                          this.isRegisterLoader = false;
                          this.toast.error('Unknown Error');
                        }
                      })
                      .catch((err: any) => {
                        this.isLoader = false;
                        this.isRegisterLoader = false;
                        console.log('err => ', err);
                        this.toast.error(err.message);
                      });
                  }
                })
                .catch((err: any) => {
                  this.isRegisterLoader = false;
                  this.isLoader = false;
                  // this.toast.error('Canceled');
                });
            } else {
              this.toast.error(res.message);
              this.isRegisterLoader = false;
              this.isLoader = false;
            }
          })
          .catch((err: any) => {
            this.toast.error(err.message);
            this.isRegisterLoader = false;
            this.isLoader = false;
          });
      } else {
        this.toast.error('Verify captcha is required');
        this.isLoader = false;
      }
    } else {
      this.isLoader = false;
    }
  }

  logout() { 
    this.fun.confirmBox('Are sure logout?', 'Yes', 'Cancel')
      .then((res: any) => {
        if (res) {
          this.Loginform?.reset();
          this.auth.logout();
          this.fun.checkToken = false;
          this.fun.isLoggedIn = false;
          this.fun.userData = {}
          window['grecaptcha'].reset();
          window.location.reload();
          this.captcha.verifyCaptcha = null
        } else {
          // this.toast.error('Canceled');
        }
      })
      .catch((err: any) => {
        console.log('err => ', err);
        this.fun.checkToken = true;
        // this.toast.error('Canceled');
      });
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, { centered: true, backdrop: 'static' });
  }

  forgotPsd(content2: any) {
    this.ForgotPsdform.markAllAsTouched();
    if (this.ForgotPsdform.valid) {
      this.forLoad = true;
      this.auth
        .forgotPassword(this.ForgotPsdform.value)
        .then((res: any) => {
          if (res && res.status) {
            this.forLoad = false;
            this.toast.success(res.message);
            // this.ForgotPsdform.reset();
            this.modalService.open(content2, {
              centered: true,
              backdrop: 'static',
            });
          } else {
            console.log('res 201 => ', res);
            
            this.toast.error(res.message);
            this.ForgotPsdform.reset();
            this.forLoad = false;
            this.modalService.dismissAll();
          }
        })
        .catch((err: any) => {
          console.log('Erro 209', err);
          if(err && err.message){
            this.toast.error(err.message);
          }
          else{
            this.toast.error('Unknown Error');
          }
          this.forLoad = false;
          this.modalService.dismissAll();
        });
    }
  }

  close() {
    this.modalService.dismissAll();
  }

  verifyOtp(){ 
    this.isVerifyLoader = true;
    this.otpForm.markAllAsTouched();
    if (this.otpForm.valid) {
      if (this.captcha.verifyCaptcha != null) {
        this.auth.verifyOtp(this.otpForm.value).then((res: any) => {
          this.isVerifyLoader = false;
          if (res && res.status) {
            this.fun.checkToken = res.status;
            this.fun.isLoggedIn = true;
            this.patchLoginData()
            this.auth.setUserToken(res.data.loginToken, res.status);
            this.changeTab.emit(1);
            this.isUserVerify = false
            this.captcha.verifyCaptcha = null
            this.otpForm.reset();
          }
          else {
            this.toast.error(res.message);
            this.isVerifyLoader = false;
          }
        }).catch((err: any) => {
          console.log('err => ', err);
          this.toast.error(err.message);
          this.isVerifyLoader = false;
          this.fun.checkToken = false;
        });
      }else {
        this.isVerifyLoader = false;
        this.fun.checkToken = false;
        this.toast.error('Verify captcha is required');
      }
    }else{
      this.isVerifyLoader = false;
      this.fun.checkToken = false;
      console.log('Form Not Vaild')
    }
  }

  resendOtp(){
    this.isResendLoader = true
    this.resentForm.patchValue({email: this.otpForm.value.emailOtp})
    this.otpForm.patchValue({otp: ''});
    if(this.resentForm.valid){
      this.auth.resendOtpPass(this.resentForm.value).then((res: any) => {
        this.isResendLoader = false;
        if (res && res.status) {
          this.toast.success(res.message)
        }
        else {
          this.toast.error(res.message);
          this.isResendLoader = false;
        }
      }).catch((err: any) => {
        console.log('err => ', err);
        this.isResendLoader = false;
        this.toast.error(err.message);
      });
    }
    else{
      this.toast.error('Email is required*')
    }

  }

  registerUser() { 

    this.isRegisterLoader = true;
    this.Loginform.markAllAsTouched();
    if (this.Loginform.valid) {
      this.Loginform.value.user_type = this.userType
      if (this.captcha.verifyCaptcha != null) {
        this.auth.userRegister(this.Loginform.value)
          .then((user: any) => {
            if (user && user.status) {
              window['grecaptcha'].reset();
              if(this.userEle.nativeElement.innerHTML == ''){
                this.captcha.addRecaptchaScript(this.userEle.nativeElement);
              }
              this.isRegisterLoader = false;
              this.isUserVerify = true
              this.captcha.verifyCaptcha = null
              this.otpForm.patchValue({emailOtp: this.Loginform.value.email})
              this.toast.success(`${user.message}`);
            } else {
              this.isRegisterLoader = false;
              this.toast.error(user.message);
            }
          })
          .catch((err: any) => {
            this.isRegisterLoader = false;
            console.log('err => ', err);
            this.toast.error(err.message);
          });
      } else {
        this.toast.error('Verify captcha is required');
        this.isRegisterLoader = false;
      }
    } else {
      this.isRegisterLoader = false;
    }
  }
}
