import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss'],
})
export class BookDetailComponent implements OnInit {
  DetailsUrl!: string;
  DetailObject: any = {};

  constructor(
    public Router: Router,
    public ActiveRouter: ActivatedRoute,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.ActiveRouter.queryParams.subscribe((params) => {
      this.DetailsUrl = params['url'];
      this.http.get(this.DetailsUrl).subscribe(
        (data: any) => {
          this.DetailObject = data;
        },
        (error) => {
          // some error message show
        }
      );
    });
  }
}
