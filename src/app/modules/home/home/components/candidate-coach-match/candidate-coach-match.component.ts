import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { FilesService } from 'src/app/core/services/files.service';
import { FunctionService } from 'src/app/core/services/function.service';

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
  dataLoader: any = false
  data_in: any = []
  data_or_in: any = []
  data_not_in: any = []
  includeSelect: any = false;
  isLoading: boolean = false
  matchAnySelect: any = false;
  matchAllSelect: any = false;
  showNextBtn: boolean = false;
  matchesData: any = [];
  frmDetails!: FormGroup;
  @Output() changeTab = new EventEmitter<number>();
  constructor(
    private fb: FormBuilder,
    public fileService: FilesService,
    public toast: ToastrService,
    public fun: FunctionService
  ) { }

  ngOnInit(): void {
    this.getExpertizeWithoutAuth()
    this.frmDetails = this.fb.group({
      country: [''],
      state: [''],
      city: [''],
      specialization: [''],
      primaryService: [''],
      primaryIndustryExperience: [''],
      data_in:[""],
      data_or_in:[""],
      data_not_in: [""]
    })
  }


  getExpertizeWithoutAuth() {
    this.isLoading = true;
    this.fileService.getAllExpertis().then((res: any) => {
      this.isLoading = false;
      if (res && res.status) {
        let data= res.data.data;
        const unique = [...new Map(data.map((m) => [m.service_name, m])).values()];
        this.setKewordsData(unique);
      }
      else {
        this.isLoading = false;
        console.log('Err somthing went wrong');
      }
    }).catch((err: any) => {
      this.isLoading = false;
      console.log(err);
    })
  }

  //INSERT KEYWORDS IN STEP 2 ARRAYS
  setKewordsData(data: any) {
    for (let index = 0; index < data.length; index++) {
      const element = data[index];
      if(index > 0 && index < 6){
        this.include.push({name: element.service_name, id: element.id}) 
        this.data_in.push(`${element.id}`)
        this.include = this.listSort(this.include)
      }
      else if(index >= 5 && index < 13){
        this.matchAny.push({ name: element.service_name, id: element.id });
        this.data_or_in.push(`${element.id}`)
        this.matchAny = this.listSort(this.matchAny)
      }
      else{
        this.matchAll.push({ name: element.service_name, id: element.id });
        this.data_not_in.push(`${element.id}`)
        this.matchAll = this.listSort(this.matchAll)
      }
    }
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
      Arr.push({name: item.name, id:item.id});
      if (item.selected) {
        select.push({name: item.name, id:item.id})
      }
    }
    Arr.sort();
    list = [];
    for (let item of Arr) {
      list.push({ name: item.name, id: item.id})
      for (let i of select) {
        if (item.name == i.name)
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
        // for (let i = 0; i < this.include.length; i++) {
        //   const ele = this.include [i];
        //   this.data_in.push(`${ele.id}`)
        // }
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
        this.data_in = []
        this.data_or_in = []
        for (let i = 0; i < this.include.length; i++) {
          const ele = this.include [i];
          this.data_in.push(`${ele.id}`)
        }
        for (let j = 0; j < this.matchAny.length; j++) {
          const eleIn = this.matchAny [j];
          this.data_or_in.push(`${eleIn.id}`)
        }
        break;
      }
      case 'matchallKey': {
        this.matchAny = (swap(this.matchAny, this.matchAll))
        this.matchAll = this.listSort(this.matchAll)
        this.data_or_in = []
        this.data_not_in = []
        for (let i = 0; i < this.matchAny.length; i++) {
          const ele = this.matchAny [i];
          this.data_or_in.push(`${ele.id}`)
        }
        for (let j = 0; j < this.matchAll.length; j++) {
          const eleIn = this.matchAll [j];
          this.data_not_in.push(`${eleIn.id}`)
        }
        break;
      }
      case 'excludeAny': {
        this.matchAny = (swap(this.matchAny, this.include))
        this.include = this.listSort(this.include)
        this.data_in = []
        this.data_or_in = []
        for (let i = 0; i < this.include.length; i++) {
          const ele = this.include [i];
          this.data_in.push(`${ele.id}`)
        }
        for (let j = 0; j < this.matchAny.length; j++) {
          const eleIn = this.matchAny [j];
          this.data_or_in.push(`${eleIn.id}`)
        }
        break;
      }
      case 'excludeAll': {
        this.matchAll = (swap(this.matchAll, this.matchAny))
        this.matchAny = this.listSort(this.matchAny)
        this.data_or_in = []
        this.data_not_in = []
        for (let i = 0; i < this.matchAny.length; i++) {
          const ele = this.matchAny [i];
          this.data_or_in.push(`${ele.id}`)
        }
        for (let j = 0; j < this.matchAll.length; j++) {
          const eleIn = this.matchAll [j];
          this.data_not_in.push(`${eleIn.id}`)
        }
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
    console.log('data_not_in => ', this.data_not_in);
    console.log('data_in => ', this.data_in);
    console.log('data_or_in => ', this.data_or_in);
    this.dataLoader = true
    this.frmDetails.markAllAsTouched();
    this.frmDetails.patchValue({data_in: this.data_in})
    this.frmDetails.patchValue({data_not_in: this.data_not_in})
    this.frmDetails.patchValue({data_or_in: this.data_or_in})
    if(this.frmDetails.valid){
      this.fileService.filterCareerProfessional(this.frmDetails.value).then((res:any)=>{
        this.dataLoader = false
        if(res && res.status){
          this.matchesData = res.data.data;
          this.fun.setFilterData = res.data.data
          this.changeTab.emit(7);
        }
        else{
          this.dataLoader = false;
          this.toast.error(res.message)
        }
      }).catch((err: any) => {
      this.dataLoader = false;
      console.log(err);
    })
    }
    else{
      this.toast.error('Please fill all required fields')
      this.dataLoader = false
    }
  }
}
