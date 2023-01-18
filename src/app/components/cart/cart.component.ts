import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
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

  constructor(
    private cartService: CartService,
    private route: Router,
    private notify: NotificationService
  ) {}

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
    const productName = this.cartItems.find(
      (item) => item.id == productId
    ).name;
    this.cartItems = this.cartItems.filter((item) => item.id != productId);
    this.notify.info(`${productName} removed from cart!`);
  }

  clearCart(): void {
    if (confirm('Are you sure you want to clear the cart?')) {
      this.cartService.clearCart();
      this.cartItems = [];
      this.notify.success('Cart cleared!');
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

  // validate fullname from ngmodelchange
  nameCheck!: string;
  validateFullName(): void {
    if (this.fullName.length < 6) {
      this.nameCheck = 'must be at least 6 characters long!';
    } else {
      this.nameCheck = '';
    }
  }

  addressCheck!: string;
  validateAddress(): void {
    if (this.address.length < 10) {
      this.addressCheck = 'must be at least 10 characters long!';
    } else {
      this.addressCheck = '';
    }
  }

  cityCheck!: string;
  validateCity(): void {
    if (this.city.length < 3) {
      this.cityCheck = 'must at least 3 characters long!';
    } else {
      this.cityCheck = '';
    }
  }

  creditCardCheckNumber!: string;
  creditCardCheckLength!: string;
  validateCreditCardNumber(): void {
    if (this.creditCardNumber.length != 16) {
      this.creditCardCheckLength = 'must be 16 digits long!';
    } else {
      this.creditCardCheckLength = '';
    }
    // check if credit card number is a number
    if (isNaN(Number(this.creditCardNumber))) {
      this.creditCardCheckNumber = 'must be a number!';
    } else {
      this.creditCardCheckNumber = '';
    }
  }
}
