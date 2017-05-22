import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { environment } from '../environments/environment';

import { Observable } from 'rxjs/observable';
import 'rxjs/add/operator/map';
import { Book } from './models/book.model';

@Injectable()
export class BookService {

  private apiUrl: string = environment.apiUrl;

  constructor(private http: Http) { }

  get(): Observable<Book[]> {
    return this.http
      .get(this.apiUrl)
      .map(res => res.json() as Book[]);
  }

}
