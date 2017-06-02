import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private searchTerm: string;

  constructor(private bookService: BookService) { }

  search(): void {
    this.bookService.searchFlux$.next(this.searchTerm);
  }

  ngOnInit(): void {
    this.bookService.lastSearchTerm$.subscribe(term => this.searchTerm = term);
  }



}
