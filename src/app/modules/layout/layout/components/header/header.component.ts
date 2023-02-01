import { Component, OnInit, Inject, HostListener, EventEmitter, Output, Input } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() headerTabIndex: number = 0;

  @Output() add = new EventEmitter<string>();
  @Output() goTotopJobs = new EventEmitter<number>();
  constructor(private router: Router
  ) {
    if (this.router.url != "") {
      if (this.router.url == "/jobrep") {
        this.tabIndex = 1;
      }
      // else if (this.router.url == "/about-us") {
      //   this.tabIndex = 2;
      // }
      else if (this.router.url == "/match") {
        this.tabIndex = 3;
      } else if (this.router.url == "/employers") {
        this.tabIndex = 4;
      }else if (this.headerTabIndex) {
        this.tabIndex = this.headerTabIndex
      } else {
        this.tabIndex = 0
      }
    }

    
    // else {
    //   this.tabIndex = 0;
    // }
  }
  tabIndex = this.headerTabIndex;
  height = 0;
  ngOnInit(): void {

  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll(e: any) {
    if (window.pageYOffset > 30) {
      let element = document.getElementById('cont');
      element!.classList.add('slim');
      document.querySelector("#scroll_start")?.classList.remove("hidden");
      document.querySelector("#scroll_end")?.classList.add("hidden");
    }
    else {
      let element = document.getElementById('cont');
      element!.classList.remove('slim');
      document.querySelector("#scroll_start")?.classList.remove("hidden");
      document.querySelector("#scroll_end")?.classList.add("hidden");
    }
    const div: any = document.querySelector('.header');
    if (div.classList.contains('mobile-menu')) {
      this.height = document.getElementsByClassName('header')[0].clientHeight;
    }
  }
  tabChange(index: number, path: string): void {

    this.tabIndex = index;
    this.onClickMenu();
      this.router.navigate([path]);
  }
  onClickMenu() {
    const div: any = document.querySelector('.header');
    if (div.classList.contains('mobile-menu')) {
      document.querySelector(".header")?.classList.remove("mobile-menu");
    } else {
      this.height = document.getElementsByClassName('header')[0].clientHeight;
      document.querySelector(".header")?.classList.add("mobile-menu");
    }
  }
}
