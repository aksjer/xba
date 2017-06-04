import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CartItem } from '../models/cart-item.model';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { Result } from '../models/result.model';

@Injectable()
export class CartService {

  public cart$: BehaviorSubject<CartItem[]> = new BehaviorSubject<CartItem[]>(undefined);
  public total$: BehaviorSubject<number> = new BehaviorSubject<number>(0);

  private apiUrl: string = environment.apiUrl;
  private cart: CartItem[] = [];

  constructor(private http: Http) { }

  public add(book: Book): void {
    if (this.cart.some((cartItem: CartItem) => cartItem.isbn === book.isbn)) {
      this.cart.find((cartItem: CartItem) => cartItem.isbn === book.isbn).quantity++;
    } else {
      this.cart.push({ title: book.title, isbn: book.isbn, price: book.price, quantity: 1 });
    }
    this.update();
  }

  public delete(isbn: string): void {
    this.cart = this.cart.filter((cartItem: CartItem) => cartItem.isbn !== isbn);
    this.update();
  }

  public quantity(cartItem: CartItem): void {
    if (cartItem.quantity) {
      this.cart.find((cartItem: CartItem) => cartItem.isbn === cartItem.isbn).quantity = cartItem.quantity;
    } else {
      this.cart = this.cart.filter((cartItem: CartItem) => cartItem.isbn !== cartItem.isbn);
    }
    this.update();
  }

  private commercialOffers(isbns): Observable<Result> {
    return this.http
      .get(`${this.apiUrl}/${isbns}/commercialOffers`)
      .map((res: Response) => res.json() as Result);
  }

  private update(): void {
    this.cart$.next(this.cart);
    this.totalCost();
  }

  private totalCost(): void {
    const total = this.cart.reduce((a: number, b: CartItem) => a + (b.price * b.quantity), 0);
    const isbns: string = this.cart.reduce((a: string, b: CartItem) => a + `${b.isbn},`, '');
    isbns ?
      this.commercialOffers(isbns.slice(0, isbns.length - 1))
        .subscribe((result: Result) => this.total$.next(this.bestReduction(total, result)))
      : this.total$.next(0);

  }

  private bestReduction(total: number, result: Result): number {
    const min: number[] = [];
    for (const reduction of result.offers) {
      switch (reduction.type) {
        case 'percentage':
          min.push(total * ((100 - reduction.value) / 100));
          break;
        case 'minus':
          min.push(total - reduction.value);
          break;
        case 'slice':
          min.push(total - (Math.floor(total / reduction.sliceValue) * reduction.value));
          break;
      }
    }
    return Math.min.apply(null, min);
  }

}


