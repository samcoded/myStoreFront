import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
  deleteIcon = faTrash;

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

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1);
    this.cartItems.find((item) => item.id == productId).quantity += 1;
  }

  removeOneItem(productId: number): void {
    this.cartService.removeOneItem(productId);
    this.cartItems.find((item) => item.id == productId).quantity -= 1;
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.cartItems = this.cartItems.filter((item) => item.id != productId);
    alert('Product removed from cart!');
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
      this.cartItems = [];
      alert('Cart cleared!');
    }
  }

  onSubmit(): void {
    this.cartService.clearCart();
    this.route.navigateByUrl('/confirm', {
      state: {
        fullName: this.fullName,
        totalPrice: this.cartTotalPrice,
        address: this.address,
        city: this.city,
      },
    });
  }
}
