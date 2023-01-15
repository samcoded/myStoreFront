import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private cartService: CartService) {}

  totalCartItems: number = this.cartService.getTotalItems();

  ngOnInit(): void {}
  ngDoCheck(): void {
    this.totalCartItems = this.cartService.getTotalItems();
  }
}
