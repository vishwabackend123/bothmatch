import { Component, Output, OnInit, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-subscription-payment',
  templateUrl: './subscription-payment.component.html',
  styleUrls: ['./subscription-payment.component.scss']
})
export class SubscriptionPaymentComponent implements OnInit {
  showDemo: any = true;

  @Output() changeTab = new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
}
