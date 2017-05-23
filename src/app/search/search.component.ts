import { Component, } from '@angular/core';
import { BookService } from '../book.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  constructor(private bookService: BookService) { }

  search(term: string): void {
    this.bookService.search(term);
  }

}
