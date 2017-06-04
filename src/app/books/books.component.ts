import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs/Subscription';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Observable<Book[]>;

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.books = this.bookService.books$;
  }

}
