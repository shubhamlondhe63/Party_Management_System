import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PartyService {
  private apiUrl = 'https://ap.greatfuturetechno.com/party'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getParties(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        catchError(this.handleError)
      );
  }

  createParty(party: any): Observable<any> {
    if (!this.validateParty(party)) {
      return throwError('Validation Error: Party name and date are required');
    }
    return this.http.post<any>(this.apiUrl, party)
      .pipe(
        catchError(this.handleError)
      );
  }

  updateParty(party: any): Observable<any> {
    if (!this.validateParty(party)) {
      return throwError('Validation Error: Party name and date are required');
    }
    return this.http.put<any>(`${this.apiUrl}/${party.id}`, party)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteParty(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private validateParty(party: any): boolean {
    if (!party.name || !party.date) {
      console.error('Validation Error: Party name and date are required');
      return false;
    }
    return true;
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message); // For demo purposes only
    return throwError('Something bad happened; please try again later.');
  }
}
