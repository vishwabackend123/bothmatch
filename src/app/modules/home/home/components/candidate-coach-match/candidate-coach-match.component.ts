import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'

@Component({
  selector: 'app-candidate-coach-match',
  templateUrl: './candidate-coach-match.component.html',
  styleUrls: ['./candidate-coach-match.component.scss']
})
export class CandidateCoachMatch implements OnInit {
  cars: any = [];
  include: any = [];
  matchAny: any = [];
  matchAll: any = [];  
  includeSelect: any = false;
  matchAnySelect: any = false;
  matchAllSelect: any = false;
  showNextBtn: boolean = false;
  frmDetails!: FormGroup;
  @Output() changeTab = new EventEmitter<number>();
  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.setKewordsData();
    this.frmDetails = this.fb.group({
      country: [''],
      state: [''],
      specialization: [''],
      primaryService: [''],
      primaryIndustryExperience: ['']
    })
  }

   //INSERT KEYWORDS IN STEP 2 ARRAYS
   setKewordsData() {
    this.include.push({ name: 'Certification Assessment' }
      , { name: 'Education Coaching' }
      , { name: 'Executive Coaching' }
      , { name: 'Leadership Coaching' }
      , { name: 'Personality Assessment' })
    this.include = this.listSort(this.include)
    this.matchAny.push({ name: 'Career Transition' }
      , { name: 'Employer Evaluation' }
      , { name: 'Interview Coaching' }
      , { name: 'Job Match Strategy' }
      , { name: 'Job Tech Strategy' }
      , { name: 'Presonal Branding' }
      , { name: 'Training Assessment' });
    this.matchAny = this.listSort(this.matchAny)
    this.matchAll.push({ name: 'Cover Letter Preparation' }
      , { name: 'Networking Coaching' }
      , { name: 'Profession Assessment' }
      , { name: 'Resume Development' }
      , { name: 'Salary Negotiation' }
      , { name: 'Skills Assessment' });
    this.matchAll = this.listSort(this.matchAll)

  }

  // EMPTY THE STEP 2 ARRAYS
  resetKewordsData() {
    this.include = [];
    this.matchAny = [];
    this.matchAll = [];
  }

  listSort(list: any) {
    let Arr = [];
    let select = [];
    for (let item of list) {
      Arr.push(item.name);
      if (item.selected) {
        select.push(item.name)
      }
    }
    Arr.sort();
    list = [];
    for (let item of Arr) {
      list.push({ name: item })
      for (let i of select) {
        if (item == i)
          list[list.length - 1].selected = true;
      }
    }
    return list;
  }
  itemDropFromInclude(e: any) {
    let filterObj = this.matchAny.filter((x: any) => x.name == e.dragData.name)
    if (filterObj == null || filterObj == '') {
      this.matchAny.push(e.dragData);
      this.matchAny = this.listSort(this.matchAny);
      this.include = this.listSort(this.include.filter((x: any) => x.name != e.dragData.name));
      this.matchAll = this.listSort(this.matchAll.filter((x: any) => x.name != e.dragData.name));
      this.showNextButton();
    }
  }
  itemDropFromMatchAny(e: any) {
    let filterObj = this.include.filter((x: any) => x.name == e.dragData.name)
    if (filterObj == null || filterObj == '') {
      this.include.push(e.dragData);
      this.include = this.listSort(this.include);
      this.matchAny = this.listSort(this.matchAny.filter((x: any) => x.name != e.dragData.name));
      this.matchAll = this.listSort(this.matchAll.filter((x: any) => x.name != e.dragData.name));
      this.showNextButton();
    }
  }
  itemDropOnMatchAll(e: any) {
    let filterObj = this.matchAll.filter((x: any) => x.name == e.dragData.name)
    if (filterObj == null || filterObj == '') {
      this.matchAll.push(e.dragData);
      this.matchAll = this.listSort(this.matchAll);
      this.matchAny = this.listSort(this.matchAny.filter((x: any) => x.name != e.dragData.name));
      this.include = this.listSort(this.include.filter((x: any) => x.name != e.dragData.name));
      this.showNextButton();
    }
  }
  includeKey(option: any) {
    switch (option) {
      case 'include': {
        this.cars = (swap(this.cars, this.include));
        this.include = this.listSort(this.include)
        break;
      }
      case 'exclude': {
        this.include = (swap(this.include, this.cars))
        this.cars = this.listSort(this.cars)
        break;
      }
      case 'matchanyKey': {
        this.include = (swap(this.include, this.matchAny))
        this.matchAny = this.listSort(this.matchAny)

        break;
      }
      case 'matchallKey': {
        this.matchAny = (swap(this.matchAny, this.matchAll))
        this.matchAll = this.listSort(this.matchAll)
        break;
      }
      case 'excludeAny': {
        this.matchAny = (swap(this.matchAny, this.include))
        this.include = this.listSort(this.include)
        break;
      }
      case 'excludeAll': {
        this.matchAll = (swap(this.matchAll, this.matchAny))
        this.matchAny = this.listSort(this.matchAny)
        break;
      }
    }
    function swap(boxA: any, boxB: any) {
      let indices = [];
      for (let item of boxA) {
        if (item.selected) {
          item.selected = false;
          boxB.push(item);
          const index = boxA.indexOf(item);
          indices.push(boxA[index].name);
        }
      }
      let temp = boxA;
      boxA = [];
      for (let item of temp) {
        let same = true;
        for (let items of indices) {
          if (item.name == items)
            same = false;
        }
        if (same) {
          boxA.push(item)
        }
        // else
        //   boxA.push(temp[item])
      }
      return boxA;
    }
    this.btnDisable();
    this.showNextButton();
  }
  selector(select: any, a: any) {
    switch (a) {
      case 4: {
        this.include = arr(this.include);
        break;
      }
      case 3: {
        this.matchAll = arr(this.matchAll);
        break
      }
      case 2: {
        this.matchAny = arr(this.matchAny);
        break
      }
      case 1: {
        this.include = arr(this.include);
        break
      }
      case 0: {
        this.cars = arr(this.cars);

        break
      }
    }
    function arr(array: any) {
      const index = array.indexOf(select);
      if (array[index].selected)
        array[index].selected = false;
      else
        array[index].selected = true;
      return array;
    }
    this.btnDisable();
  }
  btnDisable() {
    this.includeSelect = false;
    this.matchAnySelect = false;
    this.matchAllSelect = false;
    for (let item of this.include) {
      if (item.selected)
        this.includeSelect = true
    }
    for (let item of this.matchAny) {
      if (item.selected)
        this.matchAnySelect = true
    }
    for (let item of this.matchAll) {
      if (item.selected)
        this.matchAllSelect = true
    }
  }
  showNextButton() {
    if (this.matchAll.length > 0 || this.matchAny.length > 0) {
      this.showNextBtn = true;
    }
    else {
      this.showNextBtn = false;
    }
  }
  submitForm() {
    this.changeTab.emit(7);
  }
}
