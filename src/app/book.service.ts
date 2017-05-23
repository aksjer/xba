import { Injectable, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Book } from './models/book.model';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';

@Injectable()
export class BookService {

  private apiUrl: string = environment.apiUrl;
  filteredBooks$: Subject<Book[]> = new Subject<Book[]>();

  constructor(private http: Http) {
    this.get().subscribe(books => this.filteredBooks$.next(books));
  }

  get(): Observable<Book[]> {
    return this.http
      .get(this.apiUrl)
      .map(res => res.json() as Book[]);
  }

  search(term: string): void {
    term ? this.get().subscribe(books => this.filteredBooks$.next(books.filter(b => b.title.toLowerCase().includes(term.toLowerCase()))))
      : this.get().subscribe(books => this.filteredBooks$.next(books));
  }

}
