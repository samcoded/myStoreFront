import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getProducts();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.cartItems = this.cartService.getProducts();
  }

  removeOneItem(productId: number): void {
    this.cartService.removeOneItem(productId);
    this.cartItems = this.cartService.getProducts();
  }
}
