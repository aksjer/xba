import { Component, OnInit, Input } from '@angular/core';
import { Book } from '../models/book.model';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  @Input() book: Book;

  constructor(private cartService: CartService) { }

  ngOnInit() {
  }

  addToCart() {
    this.cartService.add(this.book);
  }

}
