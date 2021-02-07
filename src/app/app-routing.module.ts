import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookDetailComponent} from './bookdetail/book-detail/book-detail.component'
import { BooklistComponent} from './bookdetail/booklist/booklist.component'
const routes: Routes = [
  { path: 'bookdetails', component: BookDetailComponent, children: [] },
  { path: 'booklist', component: BooklistComponent, children: [] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
