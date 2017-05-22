import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BookService } from '../book.service';
import { Book } from '../models/book.model';

import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  bookCtrl: FormControl;
  filteredBooks: any;
  books: Book[];
  @Output() searchEvent: EventEmitter<string> = new EventEmitter();

  constructor(private bookService: BookService) { }

  ngOnInit() {
    this.bookService.get().subscribe(books => this.books = books);
  }

  search(term: string) {
    this.searchEvent.emit(term);
  }

}
