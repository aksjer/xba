import { Injectable } from '@angular/core';
import { Book } from './models/book.model';

import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import { CartItem } from './models/cart-item.model';
import { Offer } from './models/offer.model';

@Injectable()
export class CartService {

  private apiUrl: string = environment.apiUrl;
  private cart: CartItem[] = [];

  constructor(private http: Http) { }

  get(): Observable<CartItem[]> {
    return Observable.of(this.cart);
  }

  add(book: Book): void {
    if (this.cart.some(e => e.isbn === book.isbn)) {
      this.cart.find(e => e.isbn === book.isbn).quantity++;
    } else {
      this.cart.push({ title: book.title, isbn: book.isbn, price: book.price, quantity: 1 });
    }
  }

  commercialOffers(isbns): Observable<Offer[]> {
    return this.http
      .get(`${this.apiUrl}/${isbns}/commercialOffers`)
      .map(res => res.json() as Offer[]);
  }

}
