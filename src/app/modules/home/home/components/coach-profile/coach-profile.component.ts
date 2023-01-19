import { Component, Output, OnInit, EventEmitter, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilesService } from 'src/app/core/services/files.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
})
export class CoachProfileComponent implements OnInit, AfterViewInit, OnChanges {
  registerForm!: FormGroup;
  isLoader = false;
  baseImage: any;
  imageUrl: any;
  @Output() changeTab = new EventEmitter<any>();
  @Input() userData: any;

  constructor(
    public fb: FormBuilder,
    public fun: FunctionService,
    private auth: AuthService,
    public fileService: FilesService,
    public toastr: ToastrService
  ) {
    this.imageUrl = environment.imageUrl
  }

  ngOnInit() {
    this.formData();
  }

  ngAfterViewInit() {
    this.fun.getUserData().then((res: any) => {
      if (res) {
        this.fun.userData = res;
        this.updateData(this.fun.userData)
      }
    })
  }

  ngOnChanges(changes: any = this.userData): void {
    this.fun.userData = changes.userData.currentValue;
    this.baseImage = this.fun?.userData?.image
    this.imageUrl = environment.imageUrl + this.baseImage
    this.updateData(this.fun.userData)
  }


  formData() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      city: ["", Validators.required],
      country: ["", Validators.required],
      total_years_in_career_service: ["", Validators.required],
      professional_sertification: [""],
      image: [""],
      custom_tags: [""],
      profile_header: ["", Validators.required],
      service_summary: ["", Validators.required],
      industry_experience: [""],
      pofile_share_link: [""],
      website_link: [""],
      linkedin_link: [""],
      jobrep_profile_link: [""],
      top3_specialites: ["", Validators.required],
      profile_status_id: ["", Validators.required],
      approved_at: [""],
      updated_at: [""]
    })
  }

  tabChange(tab: any) {
    this.registerForm.markAllAsTouched();
    if (this.registerForm.valid) {
      this.isLoader = true
      this.auth.userDataUpdate(this.registerForm.value).then((res: any) => {
        if (res && res.success) {
          this.changeTab.emit(tab);
          this.isLoader = false;
          localStorage.setItem('userDetails', JSON.stringify(res.data))
          this.toastr.success(res.message)
          // this.registerForm.reset();
        }
        else {
          this.toastr.error(res.message);
          this.isLoader = false
        }
      }).catch((err: any) => {
        console.log('err => ', err);
        this.toastr.error(err.message)
        this.isLoader = false
      })
    }
    else {
      this.isLoader = false
    }
  }

  onFileSelected(ev: any) {
    let file = ev.target.files[0];
    if (file.size < environment.maxImageSize) {
      const formData = new FormData();
      formData.append('image', file);
      this.fileService.userFileUpload(formData).then((res: any) => {
        if (res && res.success) {
          this.baseImage = res.data?.path;
          this.registerForm.patchValue({
            image: res.data?.path
          })
          this.imageUrl = environment.imageUrl + this.baseImage;
        }
      }).catch((err: any) => {
        console.log(err);
        if (err && err.detail) {
          this.toastr.error(err.detail)
        } else {
          this.toastr.error('Internal err')
        }
      })
    }
    else {
      this.toastr.error('Less then 1mb image size uplaod')
    }

  }

  updateData(data: any = this.fun.userData) {
    if (data) {
      let date = this.fun.transformDate(data?.updated_at, 'MMM d y');
      this.registerForm.get('name').setValue(data.name);
      this.registerForm.get('email').setValue(data.email);
      this.registerForm.get('city').setValue(data.city);
      this.registerForm.get('image').setValue(data.image);
      this.registerForm.get('country').setValue(data.country);
      this.registerForm.get('total_years_in_career_service').setValue(data.total_years_in_career_service);
      this.registerForm.get('professional_sertification').setValue(data.professional_sertification);
      this.registerForm.get('custom_tags').setValue(data.custom_tags);
      this.registerForm.get('profile_header').setValue(data.profile_header);
      this.registerForm.get('service_summary').setValue(data.service_summary);
      this.registerForm.get('industry_experience').setValue(data.industry_experience);
      this.registerForm.get('pofile_share_link').setValue(data.pofile_share_link);
      this.registerForm.get('website_link').setValue(data.website_link);
      this.registerForm.get('top3_specialites').setValue(data.top3_specialites);
      this.registerForm.get('linkedin_link').setValue(data.linkedin_link);
      this.registerForm.get('jobrep_profile_link').setValue(data.jobrep_profile_link);
      this.registerForm.get('jobrep_profile_link').setValue(data.jobrep_profile_link);
      this.registerForm.get('profile_status_id').setValue(data.profile_status_id);
      this.registerForm.get('approved_at').setValue(data.approved_at);
      this.registerForm.get('updated_at').setValue(date);
    }
  }
}
