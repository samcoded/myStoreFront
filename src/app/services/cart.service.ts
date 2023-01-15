import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from './product.service';
import { Cart } from '../models/cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private productService: ProductService) {}

  // function to add cart (product id and quantity) to local storage or update if exist
  addToCart(productId: number, quantity: number): void {
    const cart: Cart[] = this.getCart();
    const index = cart.findIndex((x) => x.productId === productId);
    if (index === -1) {
      cart.push({ productId, quantity });
    } else {
      cart[index].quantity += quantity;
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  // function to get cart from local storage
  getCart(): Cart[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }

  // function to get cart items with product details
  getProducts(): Product[] {
    const cart = this.getCart();
    const products: Product[] = [];
    cart.map((x) => {
      this.productService.show(x.productId).subscribe((data) => {
        data.quantity = x.quantity;
        products.push(data);
      });
    });
    return products;
  }

  // function to remove cart item from local storage
  removeItem(productId: number): void {
    const cart: Cart[] = this.getCart();
    const index = cart.findIndex((x) => x.productId === productId);
    if (index !== -1) {
      cart.splice(index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  // function to remove one cart item quantity in local storage
  removeOneItem(productId: number): void {
    const cart: Cart[] = this.getCart();
    const index = cart.findIndex((x) => x.productId === productId);
    if (index != -1) {
      cart[index].quantity -= 1;
      if (cart[index].quantity == 0) {
        cart.splice(index, 1);
      }
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }

  // function to clear cart from local storage
  clearCart(): void {
    localStorage.removeItem('cart');
  }

  // function to get total price of cart items
  getTotalPrice(): number {
    const cart = this.getCart();
    let totalPrice = 0;
    cart.map((x) => {
      this.productService.show(x.productId).subscribe((data) => {
        totalPrice += data.price * x.quantity;
      });
    });
    return totalPrice;
  }

  // function to get total cart items
  getTotalItems(): number {
    const cart = this.getCart();
    return cart.length;
  }

  // function to get total quantity of cart items
  getTotalQuantity(): number {
    const cart = this.getCart();
    let totalQuantity = 0;
    cart.map((x) => {
      totalQuantity += x.quantity;
    });
    return totalQuantity;
  }

  // check if product in cart and return quantity
  checkProduct(productId: number): number {
    const cart = this.getCart();
    const cartItem = cart.find((x) => x.productId == productId);
    return cartItem ? cartItem.quantity : 0;
  }
}
