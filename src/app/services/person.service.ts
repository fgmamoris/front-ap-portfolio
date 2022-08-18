import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PersonDetail } from '../interfaces/personDetail';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  private url = environment.apiUrl + '/person';

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getPersonsDetail(): Observable<PersonDetail[]> {
    const url = `${this.url}/persons`;
    return this.http.get<PersonDetail[]>(url).pipe(
      tap((_) => this.log('fetched persons')),
      catchError(this.handleError<PersonDetail[]>('getPersonsDetail', []))
    );
    // #docregion PersonDetails-1
  }
  addPersonDetail(person: PersonDetail): Observable<PersonDetail> {
    //return this.http.post<PersonDetail>(`${this.url}/create`, person);
    return this.http
      .post<PersonDetail>(`${this.url}/create`, person, this.httpOptions)
      .pipe(
        tap((person: PersonDetail) =>
          this.log(`added person w/ id=${person.id}`)
        ),
        catchError(this.handleError<PersonDetail>('addPerson'))
      );
  }

  getById(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }
  updatePerson(person: PersonDetail): Observable<PersonDetail> {
    const url = `${this.url}/update/${person.id}`;

    return this.http.put<PersonDetail>(url, person).pipe(
      tap((newPerson: PersonDetail) =>
        this.log(`update Person w/ id=${person.id}`)
      ),
      catchError(this.handleError<PersonDetail>('updatePerson'))
    );
  }
  deleteById(id: number): Observable<Object> {
    return this.http.delete(`${this.url}+ / ${id}`);
  }
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
  /** Log a PersonDetailService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PersonDetailService: ${message}`);
  }
  // #enddocregion log
}
