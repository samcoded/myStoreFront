import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { Product } from '../../models/product';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css'],
})
export class ProductItemComponent {
  @Input() product!: Product;
  @Output() addToCart = new EventEmitter();
  @Output() removeFromCart = new EventEmitter();
  @Output() removeAllFromCart = new EventEmitter();
  deleteIcon = faTrash;
  constructor(
    private cartService: CartService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.updateCart();
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
    this.updateCart();
    if (this.product.quantity == 1)
      this.notify.success(`${this.product.name} added to cart!`);
  }

  onRemoveOneItem() {
    this.removeFromCart.emit(this.product);
    this.updateCart();
    if (this.product.quantity == 0)
      this.notify.info(`${this.product.name} removed from cart!`);
  }
  onRemoveItem() {
    this.removeAllFromCart.emit(this.product);
    this.updateCart();
    this.notify.info(`${this.product.name} removed from cart!`);
  }
  updateCart(): void {
    const cartItem = this.cartService.checkProductInCart(this.product.id);
    this.product.quantity = cartItem;
  }
}
