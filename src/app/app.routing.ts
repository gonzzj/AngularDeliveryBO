import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { SearchComponent } from './components/search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/delivery-form', pathMatch: 'full'},
  { path: 'delivery-form', component: FormComponent },
  { path: 'delivery-form/:id', component: FormComponent },
  { path: 'delivery-search', component: SearchComponent },
  { path: 'delivery-search/:page', component: SearchComponent },
  { path: '**', redirectTo: '/delivery-form'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
