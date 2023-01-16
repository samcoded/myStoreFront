import { Component } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.index().subscribe((products) => {
      this.products = products;
    });
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product.id, product.quantity || 1);
    // alert('Product added to cart!');
  }
}
