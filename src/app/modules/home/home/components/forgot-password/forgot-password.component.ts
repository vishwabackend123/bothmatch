import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { CustomValidators } from 'src/app/core/services/providers/CustomValidators';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  resetform!: FormGroup;
  resetPasswrod: boolean;
  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public toast: ToastrService,
    public auth: AuthService
  ) { }

  ngOnInit() {
    this.formData()
  }

  formData() {
    this.resetform = this.fb.group({
      resetPasswordToken: ["", Validators.required],
      newPassword: ["", [
        Validators.required,
        Validators.minLength(8),
        CustomValidators.patternValidator(/\d/, { hasNumber: true }),
        CustomValidators.patternValidator(/[A-Z]/, { hasCapitalCase: true }),
        CustomValidators.patternValidator(/[a-z]/, { hasSmallCase: true }),
        CustomValidators.patternValidator(/[!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/, { hasSpecialCharacters: true }),
      ]],
      confirmPassword: ["", Validators.required],
    }, {
      validator: CustomValidators.mustMatch('newPassword', 'confirmPassword')
    });
  }

  updatedPasswoord() {
    this.resetform.markAllAsTouched();
    this.route.queryParams.subscribe(params => {
      if (params) {
        this.resetform.patchValue({ resetPasswordToken: params.t });
      } else {
        this.toast.error('Internal Error')
      }
    })
    if (this.resetform.valid) {
      this.auth.resetPassword(this.resetform.value).then((res: any) => {
        if (res && res.status) {
          this.resetPasswrod = true;
          // this.toast.success(res.message)
        } else {
          this.toast.error(res.message)
        }
      }).catch((err: any) => {
        console.log('err -> ', err);
        if (err && err.message) {
          this.toast.error(err.message)
        } else {
          this.toast.error('Internal Error')
        }
      })

    }
  }

  logIn(){
    this.router.navigateByUrl('/jobrep')
  }
}
