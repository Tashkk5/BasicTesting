import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class ApiService {

	constructor	(
					private http: HttpClient
				) 
	{ 

	}

	getBooksList(): Observable<any>
	{
		const ApiEndpoint: string = 'https://www.googleapis.com/books/v1/volumes?q={search terms}';
		return this.http.get(ApiEndpoint);
	}

	
}
