import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { CartItem } from '../models/cart-item.model';
import { environment } from '../../environments/environment';
import { Book } from '../models/book.model';
import { Result } from '../models/result.model';
import { Offer } from '../models/offer.model';

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
      this.cart.find((cartI: CartItem) => cartI.isbn === cartItem.isbn).quantity = cartItem.quantity;
    } else {
      this.cart = this.cart.filter((cartI: CartItem) => cartI.isbn !== cartItem.isbn);
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
        .subscribe((result: Result) => this.total$.next(this.bestPrice(total, result)))
      : this.total$.next(0);

  }

  private bestPrice(total: number, result: Result): number {
    let min = this.offerSwitch(total, result.offers[0]);
    for (let i = 1; i < result.offers.length; i++) {
      const minCost = this.offerSwitch(total, result.offers[i]);
      if (minCost < min) {
        min = minCost;
      }
    }
    return min;
  }

  private offerSwitch(total: number, offer: Offer): number {
    switch (offer.type) {
      case 'percentage':
        return total * ((100 - offer.value) / 100);
      case 'minus':
        return total - offer.value;
      case 'slice':
        return total - (Math.floor(total / offer.sliceValue) * offer.value);
    }
  }

}


