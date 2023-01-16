import { Component } from '@angular/core';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css'],
})
export class ConfirmationComponent {
  fullName: string = '';
  totalPrice: number = 0;
  address: string = '';
  city: string = '';

  ngOnInit(): void {
    this.fullName = history.state.fullName;
    this.totalPrice = history.state.totalPrice;
    this.address = history.state.address;
    this.city = history.state.city;
  }
}
