import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { CartService } from '../cart.service';
import { CartItem } from '../models/cart-item.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: CartItem[];
  total: number;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.cartService.get().subscribe(cartItems => this.cartItems = cartItems);
    const total = this.cartItems.reduce((a, b) => a + (b.price * b.quantity), 0);
    const isbns: string = this.cartItems.reduce((a, b) => a + `${b.isbn},`, '');
    if (isbns) {
      this.cartService.commercialOffers(isbns.slice(0, isbns.length - 1)).subscribe(result => {
        if (result['offers'].length > 1) {
          const min = [];
          for (const res of result['offers']) {
            switch (res.type) {
              case 'percentage':
                min.push(total * ((100 - res.value) / 100));
                break;
              case 'minus':
                min.push(total - res.value);
                break;
              case 'slice':
                min.push(total - (Math.floor(total / res.sliceValue) * res.value));
                break;
            }
          }
          this.total = Math.min.apply(Math, min);
        } else {
          this.total = total * ((100 - result['offers'][0].value) / 100);
        }
      });
    }
  }

  delete(cartItem: CartItem) {
    if (!--cartItem.quantity) {
      this.cartItems.splice(this.cartItems.findIndex(e => e.isbn === cartItem.isbn), 1);
    }
  }

}
