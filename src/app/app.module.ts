import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  MdButtonModule, MdMenuModule, MdCardModule,
  MdIconModule, MdInputModule, MdAutocompleteModule, MdSnackBarModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { BookService } from './book.service';
import { MenuComponent } from './menu/menu.component';
import { BooksComponent } from './books/books.component';
import { BookComponent } from './book/book.component';
import { CartComponent } from './cart/cart.component';
import { ROUTES } from './app.routes';
import { SearchComponent } from './search/search.component';
import { CartService } from './cart.service';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    BooksComponent,
    BookComponent,
    CartComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(ROUTES),
    BrowserAnimationsModule,
    MdButtonModule,
    MdMenuModule,
    MdCardModule,
    MdIconModule,
    MdInputModule,
    MdAutocompleteModule,
    MdSnackBarModule
  ],
  providers: [BookService, CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
