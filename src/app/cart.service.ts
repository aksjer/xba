import { Injectable } from '@angular/core';
import { Book } from './models/book.model';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';
import { CartItem } from './models/cart-item.model';
import { Offer } from './models/offer.model';
import { Result } from './models/result.model';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CartService {

  private apiUrl: string = environment.apiUrl;
  private cart: CartItem[] = [];
  cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(undefined);
  total$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  constructor(private http: Http) { }

  add(book: Book): Observable<boolean> {
    return new Observable(observer => {
      if (this.cart.some(e => e.isbn === book.isbn)) {
        this.cart.find(e => e.isbn === book.isbn).quantity++;
      } else {
        this.cart.push({ title: book.title, isbn: book.isbn, price: book.price, quantity: 1 });
      }
      this.update();
      observer.next(true);
    });
  }

  commercialOffers(isbns): Observable<Result> {
    return this.http
      .get(`${this.apiUrl}/${isbns}/commercialOffers`)
      .map(res => res.json() as Result);
  }

  delete(isbn: string): void {
    this.cart = this.cart.filter(e => e.isbn !== isbn);
    this.update();
  }

  quantity(cartItem: CartItem): void {
    if (cartItem.quantity) {
      this.cart.find(e => e.isbn === cartItem.isbn).quantity = cartItem.quantity;
    } else {
      this.cart = this.cart.filter(e => e.isbn !== cartItem.isbn);
    }
    this.update();
  }

  update(): void {
    this.cart$.next(this.cart);
    this.totalCost();
  }

  totalCost(): void {
    const total = this.cart.reduce((a, b) => a + (b.price * b.quantity), 0);
    const isbns: string = this.cart.reduce((a, b) => a + `${b.isbn},`, '');
    if (isbns) {
      this.commercialOffers(isbns.slice(0, isbns.length - 1)).subscribe(result => {
        if (result.offers.length > 1) {
          const min = [];
          for (const res of result.offers) {
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
          this.total$.next(Math.min.apply(Math, min));
        } else {
          this.total$.next(total * ((100 - result.offers[0].value) / 100));
        }
      });
    }
    this.total$.next(0);
  }
}

