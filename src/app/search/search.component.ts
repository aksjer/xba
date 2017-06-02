import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private searchTerm: string;
  private sub: Subscription;

  constructor(private bookService: BookService) { }

  search(): void {
    this.bookService.searchFlux$.next(this.searchTerm);
  }

  ngOnInit(): void {
    this.sub = this.bookService.lastSearchTerm$.subscribe(term => this.searchTerm = term);
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }



}
