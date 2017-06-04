import { Component, OnInit } from '@angular/core';
import { CartItem } from '../models/cart-item.model';

import { Observable } from 'rxjs/Observable';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private cartItems: Observable<CartItem[]>;
  private total: Observable<number>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartItems = this.cartService.cart$;
    this.total = this.cartService.total$;
  }

  delete(isbn: string): void {
    this.cartService.delete(isbn);
  }

  quantity(cartItem: CartItem): void {
    this.cartService.quantity(cartItem);
  }

}
