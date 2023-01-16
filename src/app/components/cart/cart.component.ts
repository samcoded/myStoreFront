import { Component } from '@angular/core';
import { Router } from '@angular/router';
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

  constructor(private cartService: CartService, private route: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getProducts();
    this.cartTotalPrice = this.totalPrice();
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

  addToCart(productId: number, quantity: number): void {
    this.cartService.addToCart(productId, quantity);
    this.cartItems = this.cartService.getProducts();
    // alert('Product added to cart!');
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
    this.route.navigateByUrl('/confirm', {
      state: { fullName: this.fullName, totalPrice: this.cartTotalPrice },
    });
  }
}
