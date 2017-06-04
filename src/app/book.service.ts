import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Book } from './models/book.model';
import { environment } from '../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class BookService {

  public books$: BehaviorSubject<Book[]> = new BehaviorSubject<Book[]>(undefined);
  public searchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  public lastSearchTerm$: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);

  private apiUrl: string = environment.apiUrl;

  constructor(private http: Http) {
    this.searchTerm$
      .debounceTime(500)
      .do((term: string) => this.lastSearchTerm$.next(term))
      .subscribe((term: string) => this.get(term));
  }

  private get(term?: string): void {
    this.http
      .get(this.apiUrl)
      .map((res: Response) =>
        term ? (res.json() as Book[]).filter((book: Book) => book.title.toLowerCase().includes(term.toLowerCase()))
          : (res.json() as Book[]))
      .subscribe((books: Book[]) => this.books$.next(books));
  }

}
