import { Component, Output, OnInit, EventEmitter, Input, AfterViewInit, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FilesService } from 'src/app/core/services/files.service';
import { FunctionService } from 'src/app/core/services/function.service';
import { environment } from 'src/environments/environment';
import * as moment from 'moment';
import { ValidateBothMatchUrl, ValidateJobrepUrl, ValidateUrl } from 'src/app/core/services/url.validator';
import { IDropdownSettings } from 'ng-multiselect-dropdown';


class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-coach-profile',
  templateUrl: './coach-profile.component.html',
  styleUrls: ['./coach-profile.component.scss']
 

})
export class CoachProfileComponent implements OnInit, AfterViewInit, OnChanges {
  dropdownSettings:IDropdownSettings;
  registerForm!: FormGroup;
  myForm:FormGroup;
  isLoader = false;
  imgLoader: boolean = false
  baseImage: any;
  allExpertise:any;
  selectedExpList : any = []
  getExpData: any;
  cities:any = [];
  imageUrl: any;
  @Output() changeTab = new EventEmitter<any>();
  @Input() userData: any; top3Data:any;
  imageSrc:string | ArrayBuffer =  'assets/images/uploads.png';

  constructor(
    public fb: FormBuilder,
    public fun: FunctionService,
    private auth: AuthService,
    public fileService: FilesService,
    public toastr: ToastrService
  ) {
    // this.imageUrl = environment.imageUrl
  }

  ngOnInit() {
    this.formData();
    this.formDisabled(null);
    // this.getData();
    this.listenToUrlChange();
  }

  ngAfterViewInit() {
    this.getData()
  }

  getData(){
    this.fun.getUserData().then((res: any) => {
      
      if (res) {
        this.fun.userData = res;
        this.formDisabled(this.fun.userData);
        this.updateData(this.fun.userData)
        this.imageUrl = environment.imgPathUrl+ res.image
      }
    })
  }

  ngOnChanges(changes: any = this.userData): void {
    this.fun.userData = changes.userData.currentValue;
    this.baseImage = this.fun?.userData?.image
    
    if(this.baseImage){
      this.imageUrl = environment.imageUrl + this.baseImage
    }
    // this.imageUrl = this.baseImage
    this.updateData(this.fun.userData)
    this.formDisabled(this.fun.userData);
    this.getExpertize()
  }


  getExpertize() {
    this.fileService.getExpertise().then((res: any) => {
      
      if (res && res.status) {
        this.getExpData = res.data.data;
        this.dropdownSettings = {
          singleSelection: false,
          idField: 'service_id',
          textField: 'service_name',
          limitSelection: 3,
          enableCheckAll: false,
        };
        console.log('Get Exp > ', this.getExpData);
      }
      else {
        console.log('Err somthing went wrong');
      }
    }).catch((err: any) => {
      console.log('fssdfsfd', err);
    })
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }


  formData() {
    this.registerForm = this.fb.group({
      name: ["", Validators.required],
      email: ["", [Validators.required, Validators.pattern('[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}')]],
      city: ["", Validators.required],
      state: ["", Validators.required],
      country: ["", Validators.required],
      total_years_in_career_service: ["", Validators.required],
      professional_sertification: [""],
      image: ["", Validators.required],
      custom_tags: [""],
      profile_header: ["", Validators.required],
      service_summary: ["", Validators.required],
      industry_experience: [""],
      pofile_share_link: [""],
      website_link: [""],
      linkedin_link: [""],
      jobrep_profile_link: [""],
      top3_specialites: ["",Validators.required],
      profile_status_id: [""],
      approved_at: [""],
      updated_at: [""]
    })
  }

  formDisabled(dataForm: any = null){ 
    if(!this.fun.isLoggedIn){
      this.registerForm?.disable()
    }
    else{
      this.registerForm?.enable()
    }
  }


  
  public listenToUrlChange(){
    this.registerForm.get('linkedin_link').valueChanges.subscribe(value => {
        if(value) {
          this.registerForm.get('linkedin_link').setValidators(ValidateUrl)
          this.registerForm.get('linkedin_link').updateValueAndValidity({emitEvent: false, onlySelf: true})
        } else {
          this.registerForm.get('linkedin_link').clearValidators();
          return;
        }
    });
    this.registerForm.get('jobrep_profile_link').valueChanges.subscribe(value => {
      if(value) {
        this.registerForm.get('jobrep_profile_link').setValidators(ValidateJobrepUrl)
        this.registerForm.get('jobrep_profile_link').updateValueAndValidity({emitEvent: false, onlySelf: true})
      } else {
        this.registerForm.get('jobrep_profile_link').clearValidators();
        return;
      }
    });
    this.registerForm.get('pofile_share_link').valueChanges.subscribe(value => {
      if(value) {
        this.registerForm.get('pofile_share_link').setValidators(ValidateBothMatchUrl)
        this.registerForm.get('pofile_share_link').updateValueAndValidity({emitEvent: false, onlySelf: true})
      } else {
        this.registerForm.get('pofile_share_link').clearValidators();
        return;
      }
    });
  }


  tabChange(tab: any) { 
    // this.changeTab.emit(tab);S
    this.registerForm.markAllAsTouched();
    console.log('this.registerForm.value => ', this.registerForm.value);
    if (this.registerForm.valid) {
      this.isLoader = true
      let newData = {userDetails : this.registerForm.value}
      this.auth.userDataUpdate(newData).then((res: any) => {
        if (res && res.status) {
          this.changeTab.emit(tab);
          this.isLoader = false;
          // localStorage.setItem('userDetails', JSON.stringify(res.data))
          // this.toastr.success('Profile Updated Successfully')
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
      
      this.toastr.error("Update Required Fields");
    }
   
  }

  onFileSelected(ev: any) {
    this.imgLoader = true
    let file = ev.target.files[0];
    if (ev.target.files && ev.target.files[0]) {
      const file = ev.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.registerForm.patchValue({
          image: reader.result
        });
        this.imageSrc = reader.result;
      };
    }
    
    // const reader = new FileReader();
    if (file.size < environment.maxImageSize) {
        const formData = new FormData();
        formData.append('imageData', file);
        formData.append('fileName', file?.name);
        this.fileService.userFileUpload(formData).then((res: any) => {
        this.imgLoader = false
        
        if (res && res.status) {
          this.baseImage = res.data.url;
          this.imageUrl = environment.imgPathUrl+res.data.key_img;
          this.registerForm.patchValue({image: res.data.key_img})
        }
      }).catch((err: any) => {
        console.log(err);
        
        this.imgLoader = false
        if (err && err.detail) {
          this.toastr.error(err.detail)
        } else {
          // this.toastr.error('Internal err')
        }
      })
    }
    else {
      this.toastr.error('Less then 1mb image size uplaod')
      this.imgLoader = false
    } 
      // reader.readAsDataURL(file);
    }
  
  updateData(data: any = this.fun.userData) {  
    if (data) {
      let urlImg 
      this.registerForm.get('name').setValue(data.name);
      this.registerForm.get('email').setValue(data.email);
      this.registerForm.get('city').setValue(data.city);
      this.registerForm.get('state').setValue(data.state);
      this.registerForm.get('image').setValue(data.image);
      this.registerForm.get('country').setValue(data.country);
      if(data.total_years_in_career_service == 0){
        this.registerForm.get('total_years_in_career_service').setValue(null);
      }
      else{
        this.registerForm.get('total_years_in_career_service').setValue(data.total_years_in_career_service);                  
      }
      data.top3_specialites.service_id = 
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
      if(data.image){
        urlImg = environment.imgPathUrl+data.image
      }
      this.baseImage = urlImg
      if(data && data.updated_at){
        let dateUpdate = this.fun.transformDate(data && data.updated_at ? data.updated_at: '', 'MMM d y');
        this.registerForm.get('updated_at').setValue(dateUpdate);
      }
    }
  }
}
