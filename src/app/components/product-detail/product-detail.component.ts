import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
import { NotificationService } from '../../services/notification.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  productId: number = 0;
  product: Product = {} as Product;
  deleteIcon = faTrash;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.productId = params['id'];
    });

    this.productService.show(this.productId).subscribe((product) => {
      this.product = product;
      this.product.quantity = 0;
    });

    this.updateCart();
  }

  ngDoCheck(): void {
    this.updateCart();
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1);
    if (this.product.quantity == 0)
      this.notify.success(`${this.product.name} added to cart!`);
  }

  removeOneItem(productId: number): void {
    this.cartService.removeOneItem(productId);
    this.updateCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.updateCart();
    this.notify.info(`${this.product.name} removed from cart!`);
  }

  updateCart(): void {
    const cartItem = this.cartService.checkProductInCart(this.productId);
    this.product.quantity = cartItem;
  }
}
