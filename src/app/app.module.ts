
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component';
import { GridComponent } from './components/grid/grid.component';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { GridSortComponent } from './components/grid-sort/grid-sort.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SearchComponent,
    GridComponent,
    PaginatorComponent,
    GridSortComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
