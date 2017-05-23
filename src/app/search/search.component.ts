import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.search(null);
  }

  search(term: string): void {
    this.bookService.search(term);
  }

}
