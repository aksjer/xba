import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BooksComponent } from './books/books.component';
import { CartComponent } from './cart/cart.component';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'books', pathMatch: 'full' },
  { path: 'books', component: BooksComponent },
  { path: 'cart', component: CartComponent },
  { path: '**', redirectTo: 'books', pathMatch: 'full' },
];
