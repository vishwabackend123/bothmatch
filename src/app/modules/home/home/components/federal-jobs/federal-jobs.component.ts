import {
  Component,
  OnInit,
  ChangeDetectorRef,
  Input,
  SimpleChanges,
  Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { formatDate } from '@angular/common';
import { ReCaptchaV3Service } from 'ngx-captcha';
import { ToastrService } from 'ngx-toastr';
import { GovtMatchApp } from 'src/app/core/services/govt-match-app.service';

declare var Stripe: any;
@Component({
  selector: 'app-federal-jobs',
  templateUrl: './federal-jobs.component.html',
  styleUrls: ['./federal-jobs.component.scss'],
})
export class FederalJobsComponent implements OnInit {
  @Input() blueImgClick: number = 0;
  @Output() employersTab: any;
  inBounds = true;
  edge = {
    top: true,
    bottom: true,
    left: true,
    right: true,
  };
  match_id: number;
  excludeList: any = [];
  hgt = 0;
  isStep3Loading : boolean = false 
  frmDetails!: FormGroup;
  addressForm!: FormGroup;
  privateJobForm!: FormGroup;
  tabIndex = 0;
  isfileUploading = false;
  showPaymentDiv = false;
  showJobMatchesSteps = true;
  cars: any = [];
  include: any = [];
  matchAny: any = [];
  matchAll: any = [];
  headers: any = [];
  blurHeaders: any = [];
  rows: any = [];
  blurRows: any = [];
  patternRgex: any = '';
  numberPattern: any = '';
  tableHeading: any = '';
  cardValue: any = '4242424242424242';
  expiryValue: any = '0142';
  cvcValue: any = '123';
  selectedJobs: any = [];
  carsSelect: any = false;
  includeSelect: any = false;
  matchAnySelect: any = false;
  matchAllSelect: any = false;
  showPrivateForm: any = false;
  showDemo: any = true;
  pointerEvents: string = 'block';
  federalJobHeading: string = 'CANDIDATES + JOB SEEKERS';
  federalJobSubHeading: string = 'Instant Identity Protected Matching';
  // showJobTable: boolean = false;
  // showBlurImg: boolean = false;
  noDataFound: boolean = false;
  paymentDone: boolean = false;
  showNextBtn: boolean = false;
  isInvalid: boolean = false;
  isAddessInvalid: boolean = false;
  showSelectAndPay: boolean = true;
  isShowMobilePopup: boolean = false;
  showReadyToPay: boolean = false;
  showCompanyMatch: boolean = false;
  showJobRepComm: boolean = false;
  showCareerPro: boolean = false;
  showGovt: boolean = false;
  showTopCandidate: boolean = false;
  totalPrice: number = 0;
  step: number = 5;
  closeResult: string = '';
  stripe = Stripe(
    'pk_test_51ILswdDciuiXfYQMkeQqFkluk4cRwegunr0TR4eETHfH9EGImbs6VZh34jPKqqKBxu2rf5StGEvpW0zLASFutzL500Us82fHoy'
  );
  siteKey: any;
  clientSecret: any;
  card: any;
  printGeneratedon: any = new Date().toLocaleString();

  services = [
    { name: 'Benefits' },
    { name: 'Certification' },
    { name: 'Company Size' },
    { name: 'Education' },
    { name: 'Flexible Hours' },
    { name: 'Industry' },
    { name: 'Job Category' },
    { name: 'Job Level' },
    { name: 'Job Radius' },
    { name: 'Job Title' },
    { name: 'Job Type' },
    { name: 'Language' },
    { name: 'Learning' },
    { name: 'Location' },
    { name: 'No Travel' },
    { name: 'No Vaccine' },
    { name: 'Salary' },
  ];

  industryList = [
    { key: 'healthcare', name: 'Healthcare' },
    { key: 'IT', name: 'Information technology' },
    { key: 'real estate', name: 'Real estate and development' },
    { key: 'edu', name: 'Education' },
  ];

  hiringpathList = [
    { key: 'public', name: 'Open to the public' },
    { key: 'vet', name: 'Veterans' },
    { key: 'nguard', name: 'National Guard & Reserves' },
    { key: 'disability', name: 'Individuals with disabilities' },
    { key: 'mspouse', name: 'Military spouses' },
    { key: 'student', name: 'Students' },
    { key: 'ses', name: 'Senior executives' },
    { key: 'peace', name: 'Peace Corps & AmeriCorps Vista' },
    { key: 'overseas', name: 'Family of overseas employees' },
    { key: 'fed-internal-search', name: 'Internal to an agency' },
    { key: 'graduates', name: 'Recent graduates' },
    { key: 'fed-excepted', name: 'Excepted service' },
    { key: 'fed-competitive', name: 'Competitive service' },
    { key: 'fed-transition', name: 'Career transition (CTAP, ICTAP, RPL)' },
    { key: 'land', name: 'Land & base management' },
    { key: 'special-authorities', name: 'Special authorities' },
  ];
  minimumAmountList = [
    { key: 24000, name: '$0-$24,999' },
    { key: 25000, name: '$25,000-$49,999' },
    { key: 50000, name: '$50,000-$74,999' },
    { key: 75000, name: '$75,000-$99,999' },
    { key: 100000, name: '$100,000-$124,999' },
    { key: 125000, name: '$125,000-$149,999' },
    { key: 150000, name: '$150,000-$174,999' },
    { key: 175000, name: '$175,000-$199,999' },
    { key: 200000, name: '$200,000 or greater' },
  ];

  deptList = [
    { name: 'Department of Transportation', key: 'Transportation' },
    { name: 'Department of Veterans Affairs', key: 'Veterans Affairs' },
    { name: 'Department of the Interior', key: 'Interior' },
    { name: 'Department of the Navy', key: 'Navy' },
    { name: 'Department of the Treasury', key: 'Treasury' },
    { name: 'Department of the Air Force', key: 'Air Force' },
    { name: 'Department of the Army', key: 'Army' },
    { name: 'General Services Administration', key: 'General Services' },
    { name: 'Department of Energy', key: 'Energy' },
    { name: 'Other Agencies and Independent Organizations', key: 'Other' },
    { name: 'Department of Homeland Security', key: 'Homeland Security' },
    { name: 'Department of State', key: 'Stata' },
    { name: 'Department of Justice', key: 'Justice' },
  ];
  maximumAmountList = [
    { key: 24000, name: '$0-$24,999' },
    { key: 25000, name: '$25,000-$49,999' },
    { key: 50000, name: '$50,000-$74,999' },
    { key: 75000, name: '$75,000-$99,999' },
    { key: 100000, name: '$100,000-$124,999' },
    { key: 125000, name: '$125,000-$149,999' },
    { key: 150000, name: '$150,000-$174,999' },
    { key: 175000, name: '$175,000-$199,999' },
    { key: 200000, name: '$200,000 or greater' },
  ];
  titleList = [
    { key: 'IT specialist', name: 'IT Specialist' },
    { key: 'project manager', name: 'Project Manager' },
    { key: 'laboratory manager', name: 'Laboratory Manager' },
    { key: 'administrative assistant', name: 'Administrative Assistant' },
    { key: 'executive assistant', name: 'Executive Assistant' },
    { key: 'nurse practitioner', name: 'Nurse Practitioner' },
    { key: 'software engineer', name: 'Software Engineer' },
    { key: 'data entry', name: 'Data Entry' },
    { key: 'consultant', name: 'Consultant' },
    { key: 'other', name: 'Other' },
  ];
  typeList = [
    { key: 'manager', name: 'manager' },
    { key: 'group manager', name: 'Group Manager' },
    { key: 'Specialist', name: 'Specialist' },
    { key: 'other', name: 'Other' },
  ];

  isFreeGovt: boolean = false;
  isFreeDemo: boolean = false;
  isPrivate: boolean = false;
  isCompanyMatch: boolean = false;
  isCareerProfessionalMatch: boolean = false;
  isTopCandidatesForEmployers: boolean = false;
  isJobRepCommunity: boolean = false;

  // onResize(event: any) {
  //   var Image = document.getElementsByClassName('cnt-wrap-curate');
  //   var height = 0;
  //   height = Image[0].clientHeight;
  //   // console.log(height); /*Output in JS console*/
  //   this.hgt = parseInt(document.getElementsByClassName('cnt-wrap-curate')[0].clientHeight.toString());
  //   alert(this.hgt);

  // }

  showHideMobilePopup(event?: any) {
    if (event && event.target && event.target.innerWidth <= 767) {
      this.isShowMobilePopup = true;
    } else {
      if (window.innerWidth <= 767) {
        this.isShowMobilePopup = true;
      } else {
        this.isShowMobilePopup = false;
      }
    }
  }
  constructor(
    private api: ApiService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef,
    private modalService: NgbModal,
    private govtMatchApp: GovtMatchApp,
    private tostr: ToastrService,
    private router: Router,
    private reCaptchaV3Service: ReCaptchaV3Service
  ) {
    this.showHideMobilePopup();
    this.siteKey = environment.siteKey;
  }
  ngOnInit(): void {
    this.patternRgex = '^[a-zA-Z\\s]+$';
    this.numberPattern = '^[0-9]*$';

    // this.cars.push({ name: '123 Any Address' }, { name: 'Fishing' }, { name: 'Harvard University' }, { name: 'Hiking' }, { name: 'Jane Doe' });
    // this.include.push({ name: 'Accounting' }, { name: 'Analysis' }, { name: 'CPA' }, { name: 'Insurance' }, { name: 'Investments' }, { name: 'Leadership' }, { name: 'Management' })
    // this.isfileUploading = false;

    localStorage.removeItem('searchType');
    localStorage.removeItem('PositionTitle');
    localStorage.removeItem('LocationName');
    localStorage.removeItem('RemunerationMinimumAmount');
    localStorage.removeItem('RemunerationMaximumAmount');
    localStorage.removeItem('findNoOfMatches');
    localStorage.removeItem('selectedJobs');

    this.frmDetails = this.fb.group({
      // field: ['', [Validators.required, Validators.pattern(this.patternRgex)]],
      // location: ['', [Validators.required, Validators.pattern(this.patternRgex)]],
      // jobCategory: ['', [Validators.required, Validators.pattern(this.patternRgex)]],
      // radius: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      // jobGrade: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      // jobDepartment: ['', [Validators.required, Validators.pattern(this.patternRgex)]],
      // jobTitle: ['', [Validators.required, Validators.pattern(this.patternRgex)]],
      // salaryMin: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      // salaryMax: ['', [Validators.required, Validators.pattern(this.numberPattern)]],
      // customTags: ['', [Validators.required, Validators.pattern(this.patternRgex)]],
      // job_type: ['', [Validators.required, Validators.pattern(this.patternRgex)]],
      // recaptcha: ['', Validators.required]

      industry: [''],
      city_state: [''],
      job_category: [''],
      radius: [null],
      job_grade: [null],
      job_department: [''],
      job_title: [''],
      salary_min: [''],
      salary_max: [''],
      customTags: [ ''],
      job_type: [''],
      recaptcha: ['', Validators.required],
    });
    this.privateJobForm = this.fb.group({
      recaptcha: ['', Validators.required],
    });
    this.addressForm = this.fb.group({
      address: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      zip: ['', Validators.required],
      numbertxt: [''],
      expiry: [''],
      cvc: [''],
    });
    this.addressForm.patchValue({
      numbertxt: this.cardValue,
      expiry: this.expiryValue,
      cvc: this.cvcValue,
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['blueImgClick'] && changes['blueImgClick'].currentValue) {
      this.setSearchType('free');
      document.getElementById('topbobs')?.scrollIntoView();
      this.selectMatchType('freedemo');
    }
  }
  selectMatchType(matchType: string = 'freedemo') {
    if (matchType == 'freematch') {
      this.isFreeGovt = true;
    } else {
      this.isFreeGovt = false;
    }
    if (matchType == 'freedemo') {
      this.isFreeDemo = true;
    } else {
      this.isFreeDemo = false;
    }
    if (matchType == 'private') {
      this.isPrivate = true;
    } else {
      this.isPrivate = false;
    }
    if (matchType == 'companyMatch') {
      this.isCompanyMatch = true;
    } else {
      this.isCompanyMatch = false;
    }
    if (matchType == 'careerProfessionalMatch') {
      this.isCareerProfessionalMatch = true;
    } else {
      this.isCareerProfessionalMatch = false;
    }
    if (matchType == 'topCandidatesForEmployers') {
      this.isTopCandidatesForEmployers = true;
    } else {
      this.isTopCandidatesForEmployers = false;
    }
    if (matchType == 'jobrepcommunity') {
      this.isJobRepCommunity = true;
    } else {
      this.isJobRepCommunity = false;
    }
  }

  itemDropFromInclude(e: any) {
    ;
    let filterObj = this.matchAny.filter((x: any) => x.word == e.dragData.word);
    let word_type_update = [];
    e.dragData.selected = false 
    if (filterObj == null || filterObj == '') {
      e.dragData.word_type = 'exclude';
      word_type_update.push(e.dragData.id.toString());
      this.matchAny.push(e.dragData);
      this.matchAny = this.listSort(this.matchAny);
      
      this.include = this.listSort(
        this.include.filter((x: any) => x.word != e.dragData.word)
      );
      this.matchAll = this.listSort(
        this.matchAll.filter((x: any) => x.word != e.dragData.word)
      );
      this.govtMatchApp
        .wordTypeChange({ word_id: word_type_update, word_type: 'any' })
        .then((res: any) => {
        });
      this.showNextButton();
    }
  }
  itemDropFromMatchAny(e: any) {
    ;
    let filterObj = this.include.filter((x: any) => x.word == e.dragData.word);
    let word_type_update = [];
    if (filterObj == null || filterObj == '') {
      e.dragData.word_type = 'any';
      word_type_update.push(e.dragData.id.toString());
      this.include.push(e.dragData);
      this.include = this.listSort(this.include);
      this.matchAny = this.listSort(
        this.matchAny.filter((x: any) => x.word != e.dragData.word)
      );
      this.matchAll = this.listSort(
        this.matchAll.filter((x: any) => x.word != e.dragData.word)
      );
      this.govtMatchApp
        .wordTypeChange({ word_id: word_type_update, word_type: 'exclude' })
        .then((res: any) => {
        });
      this.showNextButton();
    }
  }
  itemDropOnMatchAll(e: any) {
    ;
    let filterObj = this.matchAll.filter((x: any) => x.word == e.dragData.word);
    let word_type_update = [];
    if (filterObj == null || filterObj == '') {
      e.dragData.word_type = 'all';
      word_type_update.push(e.dragData.id.toString());
      this.matchAll.push(e.dragData);
      this.matchAll = this.listSort(this.matchAll);
      this.matchAny = this.listSort(
        this.matchAny.filter((x: any) => x.word != e.dragData.word)
      );
      this.include = this.listSort(
        this.include.filter((x: any) => x.word != e.dragData.word)
      );
      this.govtMatchApp
        .wordTypeChange({ word_id: word_type_update, word_type: 'all' })
        .then((res: any) => {
        });
      this.showNextButton();
    }
  }
  showNextButton() {
    if (this.matchAll.length > 0 || this.matchAny.length > 0) {
      this.showNextBtn = true;
    } else {
      this.showNextBtn = false;
    }
  }
  get getControls() {
    return this.frmDetails.controls;
  }
  get getAddressControls() {
    return this.addressForm.controls;
  }
  tabChange(index: number): void {  debugger
    if (index == 1) {
      if (this.matchAny[0]) {
        this.tabIndex = index;
      } 
      else if ( (localStorage.getItem('searchType') == null || localStorage.getItem('searchType') == 'free') && !this.isfileUploading ) {
        this.showDemo = true;
        this.setDemoData();
        this.tabIndex = index;
      }
      this.showPaymentDiv = false;
    } else if (index == 2) {
      if (this.matchAny[0] || this.matchAll[0]) {
        this.tabIndex = index;
      } 
      else if ( (localStorage.getItem('searchType') == null || localStorage.getItem('searchType') == 'free') && !this.isfileUploading ) {
        this.showDemo = true;
        this.frmDetails.reset()
        this.setDemoData();
        this.tabIndex = index;
      }
      this.showPaymentDiv = false;
    } else if (index == 3) {
      if (this.blurRows[0] && this.blurHeaders[0]) this.tabIndex = index;
      if (this.selectedJobs.length > 0) {
        this.showPaymentDiv = true;
        this.showPayment();
      } else if (
        localStorage.getItem('searchType') == null && !this.isfileUploading ) {
        this.showDemo = true;
        this.setDemoData();
        this.tabIndex = index;
        this.showPaymentDiv = true;
      } else {
        this.showPaymentDiv = false;
      }
    } else if (index == 4) {
      if (this.headers[0] && this.rows[0]) {
        this.tabIndex = index;
        this.showPaymentDiv = false;
      } else if (
        localStorage.getItem('searchType') == null &&
        !this.isfileUploading
      ) {
        this.showDemo = true;
        this.setDemoData();
        this.tabIndex = index;
      }
    } else if (index == 5) {
      this.tabIndex = index;
    } else {
      this.tabIndex = index;
      this.showPaymentDiv = false;
      if (
        localStorage.getItem('searchType') != undefined &&
        localStorage.getItem('searchType') != null &&
        localStorage.getItem('searchType') != ''
      ) {
        if (localStorage.getItem('searchType') == 'free') {
          this.selectMatchType('freedemo');
        } else if (localStorage.getItem('searchType') == 'paid') {
          this.selectMatchType('private');
        } else if (
          localStorage.getItem('searchType') == 'careerProfessionalMatch'
        ) {
          this.selectMatchType('careerprofessionalmatch');
        } else if (localStorage.getItem('searchType') == 'companyMatch') {
          this.selectMatchType('companyMatch');
        } else if (localStorage.getItem('searchType') == 'freeGovt') {
          this.selectMatchType('freematch');
        } else if (localStorage.getItem('searchType') == 'jobRepCommunity') {
          this.selectMatchType('jobrepcommunity');
        } else if (
          localStorage.getItem('searchType') == 'topCandidatesForEmployers'
        ) {
          this.selectMatchType('topCandidatesForEmployers');
        }
        setTimeout(function () {
          document
            .querySelector('.checkbox-list')
            ?.classList.remove('disable-upload');
          document
            .querySelector('.main-content-upload')
            ?.classList.remove('disable-upload');
        }, 200);
      }
    }
    this.isfileUploading = false
  }
  setDemoData() {
    localStorage.setItem('searchType', 'free');
    this.showPrivateForm = false;
    // this.setDemoFormData();
    this.resetKewordsData();
    this.setKewordsData();
    this.showDemoJobIntialData();
    this.selectedJobs = [];
    for (let i = 1; i <= 3; i++) {
      this.isSelected(i + 2);
      let obj = { MatchedObjectId: '' };
      obj.MatchedObjectId = (i + 2).toString();
      this.selectedJobs.push(obj);
    }
    this.calculateDemoPrice(this.selectedJobs.length);
    this.showDemojobData();
    this.federalJobHeading = 'Both Match - Interactive Demo';
    this.federalJobSubHeading = 'Instant Identity Protected Matching';
  }

  resetAllSteps() {
    this.resetKewordsData();
    this.frmDetails.reset();
    this.addressForm.reset();
    this.blurHeaders = [];
    this.blurRows = [];
    this.headers = [];
    this.rows = [];
    this.selectedJobs = [];
  }

  fileUploadDemo() {
    this.federalJobHeading = 'Both Match - Interactive Demo';
    this.federalJobSubHeading = 'Identity Protected Matching';
    // document.querySelector(".checkbox-list")?.classList.remove('disable-upload');
    // document.querySelector(".main-content-upload")?.classList.remove('disable-upload');
    let elements = document.querySelectorAll('.after-upload');
    for (let index = 0; index < elements.length; index++) {
      elements[index]?.classList.add('hidden');
    }
    localStorage.setItem('searchType', 'free');
    this.resetKewordsData();
    this.showPrivateForm = false;
    this.isfileUploading = true;
    setTimeout(() => {
      this.setKewordsData();
      this.isfileUploading = false;
      // change tab after the list is added
      this.tabChange(1);
      for (let index = 0; index < elements.length; index++) {
        elements[index]?.classList.remove('hidden');
      }
    }, 1000);
  }
  fileUpload(event: any, str = null) {
    ;
    this.resetKewordsData();
    let elements = document.querySelectorAll('.after-upload');
    for (let index = 0; index < elements.length; index++) {
      elements[index]?.classList.add('hidden');
    }
    if (event.target.files.length != 0) {
      var ext = event.target.files[0].name.split('.').pop();
      if (ext == 'pdf' || ext == 'docx' || ext == 'doc') {
        this.isfileUploading = true;
        var formData: any = new FormData();
        formData.append('fileName', event.target.files[0].name);
        formData.append('docfile', event.target.files[0]);
        this.govtMatchApp.resumeUpload(formData).then((res: any) => {
          if (res) {
            if (res.status|| res.status) {
              this.match_id = res.data.match_id;
              this.isfileUploading =  (res.status || res.status) ? true : false 
              if (this.match_id) {
                this.govtMatchApp
                  .getReviewWords({ match_id: this.match_id })
                  .then((res: any) => {
                    if (res) {
                      this.excludeList = res.data.all_words;
                      this.setKewordsData();
                      // change tab after the list is added
                      this.tabChange(1);
                      // document.querySelector(".after-upload")?.classList.remove("hidden");
                      for (let index = 0; index < elements.length; index++) {
                        elements[index]?.classList.remove('hidden');
                      }
                      // this.isfileUploading = false
                    }
                  });
              }
            } else {
              this.isfileUploading = false;
              let elements = document.querySelectorAll('.after-upload');
              for (let index = 0; index < elements.length; index++) {
                elements[index]?.classList.remove('hidden');
              }
            }
          }
        });
        

        // setTimeout(() => {
        // this.setKewordsData();
        // this.isfileUploading = false;
        // // change tab after the list is added
        // this.tabChange(1);
        // // document.querySelector(".after-upload")?.classList.remove("hidden");
        // for (let index = 0; index < elements.length; index++) {
        //   elements[index]?.classList.remove("hidden");
        // }
        // }, 1000)
      } else {
        alert('Please upload pdf, doc or docx file');
      }
    } else {
      alert('Please upload pdf, doc or docx file');
    }

    // let file = event.target.files[0];
    // if (file) {
    //     const formData = new FormData();
    //     formData.append('docfile', file);
    //     formData.append('fileName', file?.name);
    //     this.fileService.resumeUpload(formData).then((res: any) => {
    //
    //   }).catch((err: any) => {
    //     console.log(err);
    //
    //   })
    // }
  }

  //INSERT KEYWORDS IN STEP 2 ARRAYS
  setKewordsData() {
    ;
    //{ORIGINAL ARRAY}//
    // this.include.push({ name: '123 Any Address' }, { name: 'Fishing' }, { name: 'Harvard University' }, { name: 'Hiking' }, { name: 'Jane Doe' }, { name: 'jane-doe.com' }, { name: 'joedoe@gmail.com' }, { name: 'LinkedIn.com/janedoe' }, { name: 'Painting' }, { name: 'Photography' }, { name: 'Traveling' }
    //       , { name: 'Traveling' }, { name: 'Analysis' }, { name: 'CPA' }, { name: 'Insurance' }, { name: 'Investments' }, { name: 'Leadership' }, { name: 'Management' }, { name: 'Microsoft Access' }, { name: 'Outsourcing' }, { name: 'Project Manager' }, { name: 'Python' });
    //         this.include = this.listSort(this.include)

    if(this.excludeList.length){
      this.excludeList.forEach((x) => {
        if (x.word_type == 'any') {
          this.matchAny.push(x);
        } else if (x.word_type == 'all') {
          this.matchAll.push(x);
        } else {
          this.include.push(x);
        }
      });
      /* shorting all listing  */
    this.include = this.include.length ? this.listSort(this.include) : [];
    this.matchAny = this.matchAny.length ? this.listSort(this.matchAny) : [];
    this.matchAll = this.matchAll.length ? this.listSort(this.matchAll) : [];
    }
  }

  // EMPTY THE STEP 2 ARRAYS
  resetKewordsData() {
    this.include = [];
    this.matchAny = [];
    this.matchAll = [];
  }
  submitForm() {
    ;
    this.isStep3Loading = true

    // Keyword=Software&PositionTitle=Psychologist&LocationName=Washington, DC&RemunerationMinimumAmount=26000&RemunerationMaximumAmount=85000
    // console.log(this.frmDetails)

    // localStorage.setItem('PositionTitle', this.frmDetails.value.job_title);
    // localStorage.setItem('LocationName', this.frmDetails.value.location);
    // localStorage.setItem('RemunerationMinimumAmount', this.frmDetails.value.salaryMin);
    // localStorage.setItem('RemunerationMaximumAmount', this.frmDetails.value.salaryMax);

    // if(this.frmDetails.invalid){

    //   this.isInvalid = this.frmDetails.invalid;
    //   }
    // else{
    this.isInvalid = this.frmDetails.invalid;
    if (!this.isInvalid) {
      let dataObj = this.frmDetails.value;
      dataObj.match_id = this.match_id;
      this.govtMatchApp.additionalInput(dataObj).then((res: any) => {
        
        })
        .catch((err: any) => {
          console.log(err);
          this.frmDetails.patchValue({
            recaptcha: null,
          });
        });
      
      // localStorage.setItem('PositionTitle', 'Software Developer');
      // localStorage.setItem('LocationName', 'New york');
      // localStorage.setItem('RemunerationMinimumAmount', '500');
      // localStorage.setItem('RemunerationMaximumAmount', '5000');

      if (
        localStorage.getItem('searchType') == 'paid' ||
        localStorage.getItem('searchType') == 'topCandidatesForEmployers'
      ) {
        this.showPrivateForm = true;
        this.getPaidJobIntialData();
        this.tabIndex = 3;
      } else if (localStorage.getItem('searchType') == 'free') {
        this.showPrivateForm = false;
        this.tabIndex = 3;
        this.showPaymentDiv = true;
        this.showPayment();
      } else {
        this.getJobData();
      }
    }
    // }
  }

  setDemoFormData() {
    this.frmDetails.patchValue({
      industry: 'Software Developer',
      city_state: 'New york',
      job_category: 'Development',
      radius: 12,
      job_grade: 10,
      job_department: 'Development',
      job_title: 'Development',
      salary_min: '500',
      salary_max: '5000',
      customTags: 'abc',
      job_type: 'Development',
    });
  }
  getPaidJobIntialData() {
    this.headers = [];
    this.rows = [];
    this.api.httpGet({ url: '/search?Keyword=Analysis' }).subscribe((data) => {
      if (data) {
        this.showPaidJobIntialData(data);
      } else {
        // this.showBlurImg = false;
        // this.showJobTable = false;
        this.noDataFound = true;
      }
    });
  }

  showDemoJobIntialData() {
    this.blurHeaders = [];
    this.tableHeading = 'Top Job Matches';
    this.blurHeaders = [
      'Match %',
      'Position Title',
      'Position URL',
      'Organization Name',
      'Department Name',
      'Position Start Date',
      'Position End Date',
      'Publication Start Date',
      'Application Close Date',
    ];
    this.blurRows = [];
    this.tabIndex = 3;
    for (let i = 1; i <= 10; i++) {
      let jobObj: any = {};
      jobObj['MatchedObjectId'] = i + 1;
      jobObj['Match %'] = '100 %';
      jobObj['Position Title'] = 'Job Title';
      jobObj['Position URL'] =
        'https://www.test.gov:443/Get-Job/View-Details/A6114011210';
      jobObj['Organization Name'] = 'Organization Name';
      jobObj['Department Name'] = 'Department Name';
      jobObj['Position Start Date'] = '2021-08-19';
      jobObj['Position End Date'] = '2021-08-19';
      jobObj['Publication Start Date'] = '2021-08-19';
      jobObj['Application Close Date'] = '2021-08-19';
      this.blurRows.push(jobObj);
    }
  }

  showPaidJobIntialData(data: any) {
    if (data) {
      this.blurHeaders = [];
      this.blurHeaders = [
        'Match %',
        'Position Title',
        'Position URL',
        'Organization Name',
        'Department Name',
        'Position Start Date',
        'Position End Date',
        'Publication Start Date',
        'Application Close Date',
      ];
      this.blurRows = [];
      if (
        data.SearchResult &&
        data.SearchResult.SearchResultItems &&
        data.SearchResult.SearchResultItems.length > 0
      ) {
        // var noOfMatches :any  = 0;
        this.tabIndex = 3;
        for (let element of data.SearchResult.SearchResultItems) {
          let jobObj: any = {};
          jobObj['MatchedObjectId'] = element.MatchedObjectId;
          jobObj['Match %'] = '100 %';
          jobObj['Position Title'] =
            element.MatchedObjectDescriptor.PositionTitle;
          jobObj['Position URL'] =
            'https://www.test.gov:443/Get-Job/View-Details/A6114011210';
          jobObj['Organization Name'] = 'Organization Name';
          jobObj['Department Name'] = 'Department Name';
          jobObj['Position Start Date'] = '2021-08-19';
          jobObj['Position End Date'] = '2021-08-19';
          jobObj['Publication Start Date'] = '2021-08-19';
          jobObj['Application Close Date'] = '2021-08-19';
          if (this.blurRows.length < 10) {
            this.blurRows.push(jobObj);
          } else {
            break;
          }
        }
      } else {
        this.noDataFound = true;
      }
    } else {
      this.noDataFound = true;
    }
  }
  selectJobs(event: any, matchedObjectId: any) {
    let obj = { MatchedObjectId: '' };
    obj.MatchedObjectId = matchedObjectId;
    if (event.target.checked) {
      if (this.selectedJobs.length == 0) {
        this.selectedJobs.push(obj);
      } else {
        // let filteredObj =  this.selectedJobs.filter((x:any) => x.MatchedObjectId == matchedObjectId);
        let index = this.selectedJobs.findIndex(
          (x: any) => x.MatchedObjectId == matchedObjectId
        );
        if (index == -1) {
          this.selectedJobs.push(obj);
        }
      }
    } else {
      let index = this.selectedJobs.findIndex(
        (x: any) => x.MatchedObjectId == matchedObjectId
      );
      if (index != -1) {
        this.selectedJobs.splice(index, 1);
      }
    }
    if (!this.showDemo) {
      this.calculatePrice(this.selectedJobs.length);
    }
    if (this.showDemo) {
      this.calculateDemoPrice(this.selectedJobs.length);
    }
    localStorage.setItem('selectedJobs', JSON.stringify(this.selectedJobs));
  }

  getJobData() { 
    // this.api
    //   .httpGet({ url: '/search?Keyword=Analysis&Fields=Min' })
    //   .subscribe((data) => {
    //     if (data) {
    //       this.showJobData(data);
    //     } else {
    //       // this.showBlurImg = false;
    //       // this.showJobTable = false;
    //       this.noDataFound = true;
    //     }
    //   });
      this.govtMatchApp.getCurateMatchJobs({match_id : this.match_id.toString()}).then((data:any) => {
        if (data) {
          this.showJobData(data);
          this.isStep3Loading = false
        } else {;
          this.noDataFound = true;
          this.isStep3Loading = false
        }
      })

    // this.api.httpGet({ url: '/search?Keyword=Software&PositionTitle=' + localStorage.getItem('PositionTitle') + '&LocationName=' + localStorage.getItem('LocationName') + ', DC&RemunerationMinimumAmount=' + localStorage.getItem('RemunerationMinimumAmount') + '&RemunerationMaximumAmount=' + localStorage.getItem('RemunerationMaximumAmount') }).subscribe(data => {
    // if(data){
    //   this.showJobData(data);
    // }
    // else{
    //   this.showBlurImg = false;
    //   this.showJobTable = false;
    //   this.noDataFound = true;
    // }
    // });
  }
  isSelected(id: any) {
    if (this.selectedJobs && this.selectedJobs.length > 0) {
      let index = this.selectedJobs.findIndex(
        (x: any) => x.MatchedObjectId == id
      );
      if (index > -1) return true;
      else return false;
    } else {
      return false;
    }
  }
  showDemojobData() {
    if (localStorage.getItem('searchType') == 'free') {
      this.headers = [];
      this.headers = [
        'Match %',
        'Position Title',
        'Position URL',
        'Organization Name',
        'Department Name',
        'Position Start Date',
        'Position End Date',
        'Publication Start Date',
        'Application Close Date',
      ];
      this.rows = [];
      this.tableHeading = 'Top Candidate Curated Job Matches';
      for (let element of this.blurRows) {
        let index = this.selectedJobs.findIndex(
          (x: any) => x.MatchedObjectId == element.MatchedObjectId
        );
        if (index != -1) {
          let jobObj: any = {};
          jobObj['Match %'] = '100 %';
          jobObj['Position Title'] = 'Job Title';
          jobObj['Position URL'] =
            'https://www.test.gov:443/Get-Job/View-Details/A6114011210';
          jobObj['Organization Name'] = 'Organization Name';
          jobObj['Department Name'] = 'Department Name';
          jobObj['Position Start Date'] = '2021-08-19';
          jobObj['Position End Date'] = '2021-08-19';
          jobObj['Publication Start Date'] = '2021-08-19';
          jobObj['Application Close Date'] = '2021-08-19';
          this.rows.push(jobObj);
        }
      }
    }
  }
  submitDemoPayment() {
    if (localStorage.getItem('searchType') == 'free') {
      //   this.headers =[];
      //   this.headers = ["Match %","Position Title", "Position URL", "Organization Name", "Department Name", "Position Start Date","Position End Date","Publication Start Date","Application Close Date"];
      //   this.rows = [];
      // for(let element of this.blurRows)
      //     {
      //       let index = this.selectedJobs.findIndex((x:any)=> x.MatchedObjectId == element.MatchedObjectId);
      //       if(index != -1){
      //         let jobObj :any={};
      //         jobObj["Match %"] = "100 %";
      //         jobObj["Position Title"] = "Job Title";
      //         jobObj["Position URL"] = "https://www.test.gov:443/Get-Job/View-Details/A6114011210";
      //         jobObj["Organization Name"] = "Organization Name";
      //         jobObj["Department Name"] = "Department Name";
      //         jobObj["Position Start Date"] = "2021-08-19";
      //         jobObj["Position End Date"] = "2021-08-19";
      //         jobObj["Publication Start Date"] = "2021-08-19";
      //         jobObj["Application Close Date"] = "2021-08-19";
      //         this.rows.push(jobObj);
      //       }
      //     }
      //     if(this.rows.length >0)
      //     this.tabIndex = 4;
      this.loading(true);
      this.showJobData('');
      this.loading(false);
      this.showPrivateForm = false;
    }
  }
  showJobData(data: any) { 
    if (data || data == '') {
      // this.headers = [
      //   'Match %',
      //   'Position Title',
      //   'Position URL',
      //   'Organization Name',
      //   'Department Name',
      //   'Position Start Date',
      //   'Position End Date',
      //   'Publication Start Date',
      //   'Application Close Date',
      // ];
      this.headers = [
        'Match %',
        'Position Title',
        'Position URL',
        'Organization Name',
        'Department Name',
        'Position Start Date',
        'Position End Date',
        'Publication Start Date',
        'Application Close Date',
      ];
      this.rows = [];
      this.tableHeading = '';
      // data.SearchResult.SearchResultItems = [];
      // this.showBlurImg = false;
      // this.showJobTable = true;
      // var noOfMatches :any  = 0;
      if (localStorage.getItem('searchType') == 'paid') {
        this.showPrivateForm = true;
        if (
          data.SearchResult &&
          data.SearchResult.SearchResultItems &&
          data.SearchResult.SearchResultItems.length > 0
        ) {
          this.tableHeading = 'Top Private Sector Job Matches';
          for (let element of data.SearchResult.SearchResultItems) {
            let index = this.selectedJobs.findIndex(
              (x: any) => x.MatchedObjectId == element.MatchedObjectId
            );
            if (index != -1) {
              let jobObj: any = {};
              jobObj['Match %'] = '100 %';
              jobObj['Position Title'] =
                element.MatchedObjectDescriptor.PositionTitle;
              jobObj['Position URL'] =
                element.MatchedObjectDescriptor.PositionURI;
              jobObj['Organization Name'] =element.OrganizationName ?  element.MatchedObjectDescriptor.OrganizationName: '-';
              jobObj['Department Name'] = element.MatchedObjectDescriptor.DepartmentName;
              jobObj['Position Start Date'] = formatDate(
                element.MatchedObjectDescriptor.PositionStartDate,
                'yyyy-MM-dd',
                'en-US'
              );
              jobObj['Position End Date'] = formatDate(
                element.MatchedObjectDescriptor.PositionEndDate,
                'yyyy-MM-dd',
                'en-US'
              );
              jobObj['Publication Start Date'] = formatDate(
                element.MatchedObjectDescriptor.PublicationStartDate,
                'yyyy-MM-dd',
                'en-US'
              );
              jobObj['Application Close Date'] = formatDate(
                element.MatchedObjectDescriptor.ApplicationCloseDate,
                'yyyy-MM-dd',
                'en-US'
              );
              this.rows.push(jobObj);
            }
          }
          if (this.rows.length > 0) {
            this.tabIndex = 4;
          } else {
            this.noDataFound = true;
            this.tabIndex = 4;
          }
        } else {
          // this.showBlurImg = false;
          // this.showJobTable = false;
          this.noDataFound = true;
        }
      } else if (localStorage.getItem('searchType') == 'free') {
        this.showPrivateForm = false;
        this.showDemojobData();
        if (this.rows.length > 0) {
          this.tabIndex = 4;
        } else {
          this.noDataFound = true;
          this.tabIndex = 4;
        }
      } else {
        if (localStorage.getItem('searchType') == 'companyMatch') {
          this.tableHeading = 'Top Ten Individual USA Company Instant Matches';
        } else this.tableHeading = 'Top Ten Government Sector Instant Matches';
        if ( (data.data.curated_jobs && data.data.curated_jobs.length) || data.SearchResult ) {
          for (let element of data.data.curated_jobs) {
            let jobObj: any = {};
            jobObj['Match %'] = '100 %';
            jobObj['Position Title'] = element.Job_Title;
            jobObj['Position URL'] = element.Job_URL;
            jobObj['Organization Name'] =  element.OrganizationName ? element.OrganizationName : ' - '  ; //need to resolve
            jobObj['Department Name'] = element.Department;
            jobObj['Position Start Date'] = element.PositionStartDate ? formatDate( element.MatchedObjectDescriptor.PositionStartDate, 'yyyy-MM-dd', 'en-US' ) : '-' // TODO
            jobObj['Position End Date'] = element.PositionEndDate ?  formatDate( element.MatchedObjectDescriptor.PositionEndDate, 'yyyy-MM-dd', 'en-US' ) : "-" // TODO
            jobObj['Publication Start Date'] =element.PublicationStartDate ? formatDate( element.MatchedObjectDescriptor.PublicationStartDate, 'yyyy-MM-dd', 'en-US'): "-"
            jobObj['Application Close Date'] = element.ApplicationCloseDate ? formatDate( element.MatchedObjectDescriptor.ApplicationCloseDate, 'yyyy-MM-dd', 'en-US' ):"-"
            if (this.rows.length < 10) {
              this.rows.push(jobObj);
            } else {
              break;
            }
          }
          if (this.rows.length > 0) {
            this.tabIndex = 4;
          } else {
            this.noDataFound = true;
            this.tabIndex = 4;
          }
        } else {
          this.noDataFound = true;
          this.tabIndex = 4;
        }
      }
    } else {
      // this.showBlurImg = false;
      // this.showJobTable = false;
      this.noDataFound = true;
      this.tabIndex = 4;
    }
  }

  includeKey(option: any) {
    ;
    switch (option) {
      case 'include': {
        this.cars = this.swap('cars', 'include');
        this.include = this.listSort(this.include);
        break;
      }
      case 'exclude': {
        this.include = this.swap('include', 'cars');
        this.cars = this.listSort(this.cars);
        break;
      }
      case 'matchanyKey': {
        this.include = this.swap('include', 'matchAny', 'any');
        this.matchAny = this.listSort(this.matchAny);

        break;
      }
      case 'matchallKey': {
        this.matchAny = this.swap('matchAny', 'matchAll', 'all');
        this.matchAll = this.listSort(this.matchAll);
        break;
      }
      case 'excludeAny': {
        this.matchAny = this.swap('matchAny', 'include', 'exclude');
        this.include = this.listSort(this.include);
        break;
      }
      case 'excludeAll': {
        this.matchAll = this.swap('matchAll', 'matchAny', 'any');
        this.matchAny = this.listSort(this.matchAny);
        break;
      }
    }

    this.btnDisable();
    this.showNextButton();
  }
  swap(boxA: string, boxB: string, word_type: any = null) {
    let indices = [];
    let word_type_update = [];
    for (let item of this[boxA]) {
      if (item.selected) {
        item.selected = false;
        this[boxB].push(item);
        word_type_update.push(item.id.toString());
        const index = this[boxA].indexOf(item);
        indices.push(this[boxA][index].word);
      }
    }
    word_type && this[boxB].forEach((x) => (x.word_type = word_type)); //changing word type
    this[boxB].length &&
      this.govtMatchApp
        .wordTypeChange({ word_id: word_type_update, word_type: word_type })
        .then((res: any) => {
          //calling API to update word type
        });
    let temp = this[boxA];
    this[boxA] = [];
    for (let item of temp) {
      let same = true;
      for (let items of indices) {
        if (item.word == items) same = false;
      }
      if (same) {
        this[boxA].push(item);
      }
      // else
      //   boxA.push(temp[item])
    }
    return this[boxA];
  }
  selector(select: any, a: any) { 
    switch (a) {
      case 4: {
        this.include = arr(this.include);
        break;
      }
      case 3: {
        this.matchAll = arr(this.matchAll);
        break;
      }
      case 2: {
        this.matchAny = arr(this.matchAny);
        break;
      }
      case 1: {
        this.include = arr(this.include);
        break;
      }
      case 0: {
        this.cars = arr(this.cars);

        break;
      }
    }
    function arr(array: any) {
      ;
      const index = array.indexOf(select);
      if (array[index].selected) array[index].selected = false;
      else array[index].selected = true;
      return array;
    }
    this.btnDisable();
  }

  btnDisable() {
    ;
    this.carsSelect = false;
    this.includeSelect = false;
    this.matchAnySelect = false;
    this.matchAllSelect = false;
    for (let item of this.cars) {
      if (item.selected) this.carsSelect = true;
    }
    if (this.include.length) {
      for (let item of this.include) {
        if (item.selected) this.includeSelect = true;
      }
    }
    if (this.matchAny.length) {
      for (let item of this.matchAny) {
        if (item.selected) this.matchAnySelect = true;
      }
    }
    if (this.matchAll.length) {
      for (let item of this.matchAll) {
        if (item.selected) this.matchAllSelect = true;
      }
    }
  }
  listSort(list: any) {
    let Arr = [];
    // let select = [];
    for (let item of list) {
      Arr.push(item);
      // if (item.selected) {
      //   select.push(item)
      // }
    }
    Arr.sort((a, b) => {
      const nameA = a.word.toUpperCase(); // ignore upper and lowercase
      const nameB = b.word.toUpperCase(); // ignore upper and lowercase
      return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
    });
    list = Arr;

    // for (let item of Arr) {
    //   list.push(item)
    //   for (let i of select) {
    //     if (item == i)
    //       list[list.length - 1].selected = true;
    //   }
    // }
    return list;
  }
  setSearchType(value: string) {
    if (value === 'paid') {
      this.federalJobHeading = 'USA PRIVATE SECTOR JOBS';
      this.federalJobSubHeading = 'Instant Identity Protected Matching';
      this.showJobMatchesSteps = true;
      this.showPrivateForm = true;
      this.showDemo = false;
      this.showCompanyMatch = false;
      this.showGovt = false;
      this.showTopCandidate = false;
      this.showJobRepComm = false;
      this.showCareerPro = false;
      this.showSelectAndPay = true;
      this.step = 5;
      this.resetAllSteps();
    } else if (value === 'free') {
      this.federalJobHeading = 'Both Match - Interactive Demo';
      this.federalJobSubHeading = 'Identity Protected Matching';
      this.showJobMatchesSteps = true;
      this.showDemo = true;
      this.showSelectAndPay = true;
      this.showCompanyMatch = false;
      this.showPrivateForm = false;
      this.showJobRepComm = false;
      this.showCareerPro = false;
      this.showGovt = false;
      this.showTopCandidate = false;
      this.step = 5;
      this.resetAllSteps();
      this.setDemoData();
      this.tabChange(0);
    } else if (value === 'careerProfessionalMatch') {
      this.federalJobHeading = 'CAREER PROFESSIONAL MATCH';
      this.federalJobSubHeading = 'Candidate Need Based Matching';
      this.showCareerPro = true;
      this.showJobMatchesSteps = false;
      this.showCompanyMatch = false;
      this.showJobRepComm = false;
      this.showGovt = false;
      this.showTopCandidate = false;
    } else if (value === 'companyMatch') {
      this.federalJobHeading = 'INDIVIDUAL USA COMPANY';
      this.federalJobSubHeading = 'Instant Identity Protected Matching';
      this.showJobMatchesSteps = true;
      this.showCareerPro = false;
      this.showCompanyMatch = true;
      this.showPrivateForm = false;
      this.showDemo = false;
      this.showSelectAndPay = false;
      this.showGovt = false;
      this.showTopCandidate = false;
      this.showJobRepComm = false;
      this.step = 4;
      this.resetAllSteps();
    } else if (value === 'freeGovt') {
      this.federalJobHeading = 'GOVERNMENT JOBS';
      this.federalJobSubHeading = 'Instant Identity Protected Matching';
      this.showGovt = true;
      this.showJobMatchesSteps = true;
      this.showCompanyMatch = false;
      this.showPrivateForm = false;
      this.showCareerPro = false;
      this.showDemo = false;
      this.showSelectAndPay = false;
      this.showJobRepComm = false;
      this.showTopCandidate = false;
      this.step = 4;
      this.resetAllSteps();
    } else if (value === 'jobRepCommunity') {
      this.federalJobHeading = 'JOBREP NETWORK';
      this.federalJobSubHeading = 'Curated Professional Community';
      this.showGovt = true;
      this.showJobMatchesSteps = true;
      this.showCompanyMatch = false;
      this.showPrivateForm = false;
      this.showDemo = false;
      this.showCareerPro = false;
      this.showSelectAndPay = false;
      this.showTopCandidate = false;
      this.showJobRepComm = true;
      this.step = 4;
      this.resetAllSteps();
    } else if (value === 'topCandidatesForEmployers') {
      this.federalJobHeading = 'EMPLOYERS + RECRUITERS';
      this.federalJobSubHeading = 'Curate + Promote Job Listing';
      this.showGovt = false;
      this.showJobMatchesSteps = true;
      this.showCompanyMatch = false;
      this.showPrivateForm = false;
      this.showDemo = false;
      this.showCareerPro = false;
      // this.showTopCandidate = false;
      this.showJobRepComm = false;
      this.showSelectAndPay = true;
      this.showTopCandidate = true;
      this.step = 5;
      this.resetAllSteps();
    } else {
      this.federalJobHeading = 'CANDIDATES + JOB SEEKERS';
      this.federalJobSubHeading = 'Identity Protected Matching';
      this.pointerEvents = 'block';
      this.showJobMatchesSteps = true;
      this.showDemo = false;
      this.showSelectAndPay = false;
      this.showCompanyMatch = false;
      this.showGovt = false;
      this.step = 4;
      this.resetAllSteps();
    }
    localStorage.setItem('searchType', value);
    document
      .querySelector('.checkbox-list')
      ?.classList.remove('disable-upload');
    document
      .querySelector('.main-content-upload')
      ?.classList.remove('disable-upload');
  }

  calculatePrice(noOfJobSelected: any) {
    // without type info
    if (+noOfJobSelected > 0) {
      this.showPayment();
      this.totalPrice = 20 * +noOfJobSelected;
      localStorage.setItem('findNoOfMatches', noOfJobSelected);
    } else {
      this.totalPrice = 0;
      this.closePaymentModel();
      this.selectedJobs = [];
      localStorage.removeItem('findNoOfMatches');
    }
  }
  calculateDemoPrice(noOfJobSelected: any) {
    // without type info
    if (+noOfJobSelected > 0) {
      this.showPaymentDiv = true;
      this.totalPrice = 20 * +noOfJobSelected;
      localStorage.setItem('findNoOfMatches', noOfJobSelected);
    } else {
      this.showPaymentDiv = false;
      this.totalPrice = 0;
      this.closePaymentModel();
      this.selectedJobs = [];
      localStorage.removeItem('findNoOfMatches');
    }
  }
  showPayment() {
    this.showPaymentDiv = true;
    this.cdr.detectChanges();
    if (!this.showDemo) this.intializeCard();
  }
  intializeCard() {
    var elements = this.stripe.elements();
    var elementStyles = {
      base: {
        fontFamily: 'sans-serif',
        lineHeight: '36px',
        fontSize: '14px',
        '::placeholder': {
          color: '#aaa',
        },
        ':-webkit-autofill': {
          color: '#e39f48',
        },
      },
      invalid: {
        color: 'red',
      },
    };
    this.card = elements.create('cardNumber', {
      style: elementStyles,
    });
    this.card.mount('#card-number');

    var cardExpiry = elements.create('cardExpiry', {
      style: elementStyles,
    });
    cardExpiry.mount('#card-expiry');

    var cardCvc = elements.create('cardCvc', {
      style: elementStyles,
    });
    cardCvc.mount('#card-cvc');
    this.card.on('change', function (event: any) {
      if (document) {
        document
          .querySelector('#card-error')
          ?.setAttribute('textContent', event.error ? event.error.message : '');
      }
    });
    let form = document.getElementById('payment-form');
    if (form)
      form.addEventListener('submit', function (event) {
        event.preventDefault();
      });
  }

  payWithCard() {
    if (this.addressForm.invalid) {
      this.isAddessInvalid = this.addressForm.invalid;
    } else {
      this.isAddessInvalid = this.addressForm.invalid;
      let that = this;
      this.loading(true);
      let url = 'payments/createPayment';
      const body = JSON.stringify({
        data: {
          amount: this.selectedJobs.length,
          city: this.addressForm.value.city,
          state: this.addressForm.value.state,
          address: this.addressForm.value.address,
          zip: this.addressForm.value.zip,
        },
      });
      this.api.httpPost(url, body).subscribe((res) => {
        if (res && res.data && res.data.clientSecret) {
          this.stripe
            .confirmCardPayment(res.data.clientSecret, {
              payment_method: {
                card: this.card,
              },
            })
            .then(function (result: any) {
              if (result.error) {
                that.showError(result.error.message);
                that.loading(false);
              } else {
                that.showPaymentDiv = false;
                that.loading(false);
                that.paymentDone = true;
                that.tostr.success(result.paymentIntent.status);
                that.intializeCard();
                that.getJobData();
              }
            });
        } else {
          this.loading(false);
          that.showError('Payment not done.. try again.');
        }
      });
    }
  }
  showError(errorMsgText: any) {
    this.loading(false);
    var errorMsg: any = document.querySelector('#card-error');
    errorMsg.textContent = errorMsgText;
    setTimeout(function () {
      errorMsg.textContent = '';
    }, 4000);
  }
  loading(isLoading: any) {
    if (isLoading) {
      document.querySelector('#spinner')?.classList.remove('hidden');
      document.querySelector('#button-text')?.classList.add('hidden');
      document.querySelector('#submit')?.setAttribute('disabled', 'disabled');
    } else {
      document.querySelector('#spinner')?.classList.add('hidden');
      document.querySelector('#button-text')?.classList.remove('hidden');
      document.querySelector('#submit')?.removeAttribute('disabled');
    }
  }
  downloadAsPdf() {
    this.exportAsPDF(this.rows);
  }
  exportAsPDF(selectedRows: any[] = []) {
    let col = this.headers;
    let field = this.headers;
    // let logoImg = environment.imgBaseUrl+"/assets/images/creditcard-logo.jpg";
    let logoImg = environment.imgBaseUrl + '/assets/images/creditcard-logo.jpg';
    this.newDownloadPdfFunction(
      logoImg,
      'Your Selection',
      this.rows,
      field,
      col,
      'Selcted_Jobs'
    );
  }
  newDownloadPdfFunction(
    logoImg: string,
    reportTitle: string,
    reportData: any,
    selectedFieldName: any,
    selectedColumn: any,
    reportName: string
  ) {
    let allColumns: any = [];
    if (reportData && reportData.length > 0) {
      allColumns = Object.keys(reportData[0]);
    }
    let rows = JSON.parse(JSON.stringify(reportData));
    allColumns.forEach((key: any) => {
      if (!selectedFieldName.includes(key)) {
        rows.forEach((element: any) => {
          delete element[key];
        });
      }
    });
    let selectedColumns = [];
    selectedColumns.push(selectedColumn);

    let tblData: any = [];
    rows.forEach((row: any) => {
      let data: any = [];
      selectedFieldName.forEach((key: any) => {
        data.push(row[key]);
      });
      tblData.push(data);
    });
    let genratedOnDate = new Date().toLocaleString();
    var pdf = new jsPDF('landscape');

    var pageHeight =
      pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    var pageWidth =
      pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();

    pdf.setFillColor(51, 204, 204);
    pdf.roundedRect(5, 5, pageWidth - 10, 30, 3, 3, 'F');

    pdf.addImage(logoImg, 'jpg', 8, 9, 80, 15);

    pdf.text(reportTitle, 12, 30);
    pdf.text(this.tableHeading, 130, 18);

    pdf.setFontSize(12);
    pdf.text('Generated On:', 250, 15);
    pdf.setFontSize(10);
    pdf.text(genratedOnDate, 250, 20);
    (pdf as any).autoTable({
      head: selectedColumns,
      body: tblData,
      startY: 40,
      tableWidth: 'auto',
      margin: {
        top: 5,
      },
      styles: {
        fontSize: 7,
        overflow: 'linebreak',
      },
      theme: 'grid',
    });
    pdf.save(reportName + '_export_' + new Date().getTime() + '.pdf');
  }

  closePaymentModel() {
    this.showPaymentDiv = false;
  }
  checkEdge(event: any) {
    this.edge = event;
  }
  pageChange(index: number): void {
    this.employersTab = index;

    // this.onClickMenu();
    this.router.navigate(['employers']);
    this.router.navigate(['employers'], {
      state: { EmployerTab: this.employersTab },
    });
  }

  ShowMobilePopup(action: any) {
    if (action == 'show') {
      document.querySelector('#mobliePaymentModal')?.classList.remove('fade');
      document.querySelector('#mobliePaymentModal')?.classList.add('show');
      document.querySelector('.new-blur')?.classList.add('my-scrool');
    } else {
      document.querySelector('#mobliePaymentModal')?.classList.remove('show');
      document.querySelector('.new-blur')?.classList.remove('my-scrool');
      document.querySelector('#mobliePaymentModal')?.classList.add('fade');
    }
  }
  changeTabByChild(tabIndex: any) {
    if (localStorage.getItem('searchType') == 'companyMatch') {
      this.getJobData();
    }
    this.tabIndex = tabIndex;
  }
}
