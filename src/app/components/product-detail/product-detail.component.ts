import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
})
export class ProductDetailComponent {
  productId: number = 0;
  product: Product = {} as Product;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
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

  addToCart(productId: number, quantity: number): void {
    this.cartService.addToCart(productId, quantity);
    alert('Product added to cart!');
  }

  removeOneItem(productId: number): void {
    this.cartService.removeOneItem(productId);
    this.updateCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.updateCart();
    alert('Product removed from cart!');
  }

  updateCart(): void {
    const cartItem = this.cartService.checkProductInCart(this.productId);
    this.product.quantity = cartItem;
  }
}
