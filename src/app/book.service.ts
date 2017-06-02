import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Book } from './models/book.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  private apiUrl: string = environment.apiUrl;
  books$: Subject<Book[]> = new Subject<Book[]>();
  searchFlux$ = new Subject<string>();

  constructor(private http: Http) {
    this.searchFlux$
      .debounceTime(300)
      .subscribe(term => term ? this.search(term) : this.get());
  }

  get(): void {
    this.http
      .get(this.apiUrl)
      .map(res => (res.json() as Book[]))
      .subscribe(books => this.books$.next(books));
  }

  search(term: string): void {
    this.http
      .get(this.apiUrl)
      .map(res => (res.json() as Book[]).filter(b => b.title.toLowerCase().includes(term.toLowerCase())))
      .subscribe(books => this.books$.next(books));
  }

}
