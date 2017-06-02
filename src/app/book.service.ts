import { Injectable, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Book } from './models/book.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/distinctUntilChanged';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BookService {

  private apiUrl: string = environment.apiUrl;
  books$: Subject<Book[]> = new Subject<Book[]>();
  searchFlux$ = new BehaviorSubject<string>(undefined);

  constructor(private http: Http) {
    this.searchFlux$
      .debounceTime(300)
      .distinctUntilChanged()
      .subscribe(term => term ? this.search(term) : this.get());
  }

  get(term?: string): void {
    this.http
      .get(this.apiUrl)
      .map(res => (res.json() as Book[]))
      .subscribe(books => this.books$.next(books));
  }

  search(term): void {
    this.http
      .get(this.apiUrl)
      .map(res => (res.json() as Book[]).filter(b => b.title.toLowerCase().includes(term.toLowerCase())))
      .subscribe(books => this.books$.next(books));
  }

  // search(term: string): void {
  //   term ? this.get().subscribe(books => this.books$.next(books.filter(b => b.title.toLowerCase().includes(term.toLowerCase()))))
  //     : this.get().subscribe(books => this.books$.next(books));
  // }

}
