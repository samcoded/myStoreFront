# MyStoreFront

This is ecommerce application built with Angular

## Install dependencies

```
 npm install
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Routes

`/` - Home and Products Page

`/product/{id}` - Product details of id

`/cart` - Cart items and checkout

`/confirm` - Confirmation after checkout

## Components

`cart` - Cart and Checkout page

`confirmation` - Confirmation after checkout

`products` - Main page and product list

`product-item` - Individual product item

`product-detail` - Product details

## Services

`cart` - Handle storing and fetching cart items from localStorage

`product` - Handle fetching products from database

## Models

`Product` - Product item

`Cart` - Cart item

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
