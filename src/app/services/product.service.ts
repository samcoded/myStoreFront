import { Injectable } from '@angular/core';
import { Product } from '../models/product';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000';

  constructor(private http: HttpClient) {}

  index(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }

  show(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(
      `${this.apiUrl}/products`,
      product,
      httpOptions
    );
  }

  update(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.apiUrl}/products/${product.id}`,
      product,
      httpOptions
    );
  }

  delete(id: number): Observable<Product> {
    return this.http.delete<Product>(`${this.apiUrl}/products/${id}`);
  }

  // index(): Product[] {
  //   return this.products;
  // }

  // show(id: number): Product {
  //   return this.products.find((product) => product.id == id) as Product;
  // }

  // add(product: Product): void {
  //   this.products.push(product);
  // }

  // update(product: Product): void {
  //   let index = this.products.findIndex((p) => p.id == product.id);
  //   this.products[index] = product;
  // }

  // delete(id: number): void {
  //   let index = this.products.findIndex((p) => p.id == id);
  //   this.products.splice(index, 1);
  // }
}
