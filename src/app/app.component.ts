import { Component } from '@angular/core';
declare const $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'curate-match';
  constructor() {
    var w_width = $(window).width(); var header = 0; function scrollHead() { if ($(document).scrollTop() > 30) { if (header == 0) { header = 1; $('.header').addClass('slim'); } } else { if (header == 1) { header = 0; $('.header').removeClass('slim'); } } } scrollHead(); $(window).scroll(scrollHead); $(function () { $(window).scroll(function () { if ($(window).scrollTop() > 150) { $("#back-to-top").addClass("visible"); } else { $("#back-to-top").removeClass("visible"); } }); $("#back-to-top").click(function () { $("body,html").animate({ scrollTop: 0 }, 800); return false; }); }); $("<button id='back-to-top'><span>Top</span></button>").clone().appendTo(".footer"); $("<a href='javascript:history.go(-1)' class='back-btn' title=''>Back</a>").clone().appendTo(".page-back");
  }
}
