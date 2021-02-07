import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgxBootstrapIconsModule, allIcons } from 'ngx-bootstrap-icons';
import { BookDetailComponent } from './bookdetail/book-detail/book-detail.component';
import { BooklistComponent } from './bookdetail/booklist/booklist.component';
@NgModule({
  declarations: [
    AppComponent,
    BookDetailComponent,
    BooklistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgxBootstrapIconsModule.forRoot(allIcons)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
