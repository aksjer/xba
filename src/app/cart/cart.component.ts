import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CartService } from '../cart.service';
import { CartItem } from '../models/cart-item.model';

import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: Observable<CartItem[]>;
  total: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartItems = this.cartService.cart$;
    this.total = this.cartService.total$;
  }

  delete(isbn: string) {
    this.cartService.delete(isbn);
  }

  quantity(cartItem: CartItem) {
    this.cartService.quantity(cartItem);
  }

}
