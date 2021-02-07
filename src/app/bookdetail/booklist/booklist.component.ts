import { Component, ViewChild, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { Book } from '../../../models/Book';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booklist',
  templateUrl: './booklist.component.html',
  styleUrls: ['./booklist.component.scss'],
})
export class BooklistComponent implements OnInit {
  BooksList: Book[] = [];
  OrignalBooksList: Book[] = [];
  Pages: string[] = ['1', '2', '3'];
  LowerIndex: number = 0;
  UpperIndex: number = 5;
  SortToggler: boolean = true;
  PaginationValue: string = '5';
  CurrentPage: string = '1';
  BookObject: Book = {
    Description: '',
    BookLink: '',
    InfoLink: '',
    PageCount: '',
    Publisher: '',
    Title: '',
  };
  DetailComponentFlag: any;

  constructor(private ApiService: ApiService, public router: Router) {}

  ngOnInit() {
    if (window.location.pathname == '/bookdetails')
      this.DetailComponentFlag = true;
    else this.DetailComponentFlag = false;
    this.fetchBooksList();
  }

  fetchBooksList() {
    this.ApiService.getBooksList().subscribe(
      (data: any) => {
        data.items.forEach(
          (BookObject: {
            volumeInfo: {
              title: any;
              publisher: any;
              pageCount: any;
              infoLink: any;
              description: any;
            };
            selfLink: any;
          }) => {
            this.BooksList.push({
              Title: BookObject.volumeInfo.title
                ? BookObject.volumeInfo.title
                : 'Unavailable',
              Publisher: BookObject.volumeInfo.publisher
                ? BookObject.volumeInfo.publisher
                : 'Unavailable',
              PageCount: BookObject.volumeInfo.pageCount
                ? BookObject.volumeInfo.pageCount.toString()
                : 'Unavailable',
              InfoLink: BookObject.volumeInfo.infoLink
                ? BookObject.volumeInfo.infoLink
                : 'Unavailable',
              BookLink: BookObject.selfLink
                ? BookObject.selfLink
                : 'Unavailable',
              Description: BookObject.volumeInfo.description
                ? BookObject.volumeInfo.description
                : 'Unavailable',
            });
          }
        );
        this.setPages();
        this.OrignalBooksList = this.BooksList;
      },
      (error) => {}
    );
  }

  redirectUrl(URL: string) {
    window.open(URL);
  }

  setPages() {
    if (this.BooksList.length == 0) this.Pages = ['0'];

    let NumberOfPages: Number = Math.ceil(
      this.BooksList.length / Number.parseInt(this.PaginationValue)
    );
    this.Pages = [];
    for (let i = 1; i <= NumberOfPages; i++) this.Pages.push(i.toString());
    this.CurrentPage = '1';
  }

  loadPreviousPage() {
    if (this.LowerIndex - Number.parseFloat(this.PaginationValue) >= 0) {
      this.LowerIndex =
        this.LowerIndex - Number.parseFloat(this.PaginationValue);
      this.UpperIndex =
        this.UpperIndex - Number.parseFloat(this.PaginationValue);
      this.CurrentPage = (Number.parseInt(this.CurrentPage) - 1).toString();
    }
  }

  loadNextPage() {
    if (
      this.UpperIndex + Number.parseFloat(this.PaginationValue) <=
      this.BooksList.length
    ) {
      this.LowerIndex =
        this.LowerIndex + Number.parseFloat(this.PaginationValue);
      this.UpperIndex =
        this.UpperIndex + Number.parseFloat(this.PaginationValue);
      this.CurrentPage = (Number.parseInt(this.CurrentPage) + 1).toString();
    }
  }

  sortTableByColumn(ColumnName: string) {
    if (this.SortToggler) {
      this.BooksList.sort((a: any, b: any) =>
        a[ColumnName].localeCompare(b[ColumnName])
      );
      this.SortToggler = !this.sortTableByColumn;
    } else {
      this.BooksList.sort((a: any, b: any) =>
        b[ColumnName].localeCompare(a[ColumnName])
      );
      this.SortToggler = !this.SortToggler;
    }
  }

  applyPagination(event: any) {
    this.LowerIndex = 0;
    this.PaginationValue = event.target.value;
    switch (this.PaginationValue) {
      case '5':
        this.UpperIndex = 5;
        break;
      case '10':
        this.UpperIndex = 10;
        break;
      case '15':
        this.UpperIndex = 15;
        break;
      case '20':
        this.UpperIndex = 20;
        break;
    }
    this.setPages();
  }

  loadSpecificPage(PageNumber: string) {
    let IntPageNumber = Number.parseInt(PageNumber);
    this.LowerIndex =
      IntPageNumber * Number.parseInt(this.PaginationValue) -
      Number.parseInt(this.PaginationValue);
    this.UpperIndex = IntPageNumber * Number.parseInt(this.PaginationValue);
    this.CurrentPage = PageNumber;
  }

  searchBook(event: any) {
    this.BooksList = this.OrignalBooksList;
    let SearchText = event.target.value.toLocaleUpperCase();
    this.BooksList = this.BooksList.filter((x) => {
      if (
        x.Title.toLocaleUpperCase().includes(SearchText) ||
        x.Publisher.toLocaleUpperCase().includes(SearchText) ||
        x.PageCount.toLocaleUpperCase().includes(SearchText)
      )
        return true;
      else return false;
    });
  }

  openDetails(Book: Book) {
    this.router.navigate(['/bookdetails'], {
      queryParams: { url: Book.BookLink },
    });
    this.BookObject = Book;
  }
}
