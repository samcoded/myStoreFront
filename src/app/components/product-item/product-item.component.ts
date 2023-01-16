import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { Product } from '../../models/product';

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.updateCart();
  }

  onAddToCart() {
    this.addToCart.emit(this.product);
    this.updateCart();
  }

  onRemoveOneItem() {
    this.removeFromCart.emit(this.product);
    this.updateCart();
  }
  onRemoveItem() {
    this.removeAllFromCart.emit(this.product);
    this.updateCart();
  }
  updateCart(): void {
    const cartItem = this.cartService.checkProductInCart(this.product.id);
    this.product.quantity = cartItem;
  }
}
