import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Interest } from '../interfaces/interest';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class InterestService {
  private url = environment.apiUrl + '/interest';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAll(): Observable<Interest[]> {
    const url = `${this.url}/interests`;
    return (
      this.http
        .get<Interest[]>(url)
        // #enddocregion getinterests
        .pipe(
          // #enddocregion getinterests-2
          tap((_) => this.log('fetched interests')),
          // #docregion getInterest
          catchError(this.handleError<Interest[]>('getinterests', []))
        )
    );
    // #docregion Interest
  }

  addInterest(interest: Interest, personId: number): Observable<Interest> {
    const url = `${this.url}/create`;
    const interestWithPerson = {
      descripcion: interest.descripcion,
      persona: {
        id: personId,
      },
    };

    return this.http.post<Interest>(url, interestWithPerson).pipe(
      tap((newInterest: Interest) =>
        this.log(`added Interes w/ id=${interest.id}`)
      ),
      catchError(this.handleError<Interest>('addIntrerest'))
    );
  }
  getById(id: number): Observable<Interest> {
    const url = `${this.url}/${id}`;
    return this.http.get<Interest>(url).pipe(
      tap((_) => this.log(`fetched Interest id=${id}`)),
      catchError(this.handleError<Interest>(`get Interest id=${id}`))
    );
  }
  getInterestByPersonId(id: number): Observable<Interest> {
    const url = `${this.url}/byperson/${id}`;
    return this.http.get<Interest>(url).pipe(
      tap((_) => this.log(`fetched Interest id=${id}`)),
      catchError(this.handleError<Interest>(`get Interest id=${id}`))
    );
  }

  updateInterest(interest: Interest): Observable<Interest> {
    const url = `${this.url}/update/${interest.id}`;
    return this.http.put<Interest>(url, interest).pipe(
      tap((updateInteres: Interest) =>
        this.log(`update Interes w/ id=${interest.id}`)
      ),
      catchError(this.handleError<Interest>('updateInteres'))
    );
  }

  /** DELETE: delete the interes from the server */

  deleteInterest(id: number): Observable<any> {
    const url = `${this.url}/delete/${id}`;

    return this.http.delete<Interest>(url).pipe(
      tap((_) => this.log(`deleted Interest id=${id}`)),
      catchError(this.handleError<any>('deleteInteres'))
    );
  }
  // #docregion handleError
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  // #enddocregion handleError
  // #docregion log
  /** Log a InterestService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`InterestService: ${message}`);
  }
  // #enddocregion log
}
