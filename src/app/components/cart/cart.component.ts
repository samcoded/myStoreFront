import { Component } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  cartItems: any[] = [];
  cartTotalPrice: number = 0;
  fullName: string = '';
  address: string = '';
  city: string = '';
  creditCardNumber: string = '';

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getProducts();
  }
  ngDoCheck(): void {
    this.cartTotalPrice = this.totalPrice();
  }

  totalPrice(): number {
    let total = 0;
    this.cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.cartItems = this.cartService.getProducts();
  }

  removeOneItem(productId: number): void {
    this.cartService.removeOneItem(productId);
    this.cartItems = this.cartService.getProducts();
  }

  clearCart(): void {
    this.cartService.clearCart();
    this.cartItems = [];
  }

  onSubmit(): void {
    this.cartService.clearCart();
    this.cartItems = [];
    this.fullName = '';
    this.address = '';
    this.city = '';
    this.creditCardNumber = '';
    alert('Order placed!');
  }
}
