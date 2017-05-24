import { Component, Input, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { CartService } from '../cart.service';
import { MdSnackBar } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnDestroy {

  @Input() book: Book;
  sub: Subscription;

  constructor(private cartService: CartService, private snackBar: MdSnackBar) { }

  addToCart(): void {
    this.sub = this.cartService.add(this.book).subscribe(success => {
      if (success) {
        this.snackBar.open('Added successfully', null, { duration: 1000 });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

}
