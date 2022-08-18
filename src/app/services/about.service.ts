import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { About } from '../interfaces/about';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private url = environment.apiUrl + '/about';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAll(): Observable<About[]> {
    const url = `${this.url}/abouts`;
    return (
      this.http
        .get<About[]>(url)
        // #enddocregion abouts
        .pipe(
          // #enddocregion abouts
          tap((_) => this.log('fetched abouts')),
          // #docregion abouts
          catchError(this.handleError<About[]>('getabouts', []))
        )
    );
    // #docregion interests
  }

  //POST: add a new about to the server
  addAbout(about: About, personId: number): Observable<About> {
    const url = `${this.url}/create`;
    const aboutWithPerson = {
      descripcion: about.descripcion,
      persona: {
        id: personId,
      },
    };
    return this.http.post<About>(url, aboutWithPerson).pipe(
      tap((newAbout: About) => this.log(`added About w/ id=${about.id}`)),
      catchError(this.handleError<About>('addAbout'))
    );
  }
  getById(id: number): Observable<About> {
    const url = `${this.url}/${id}`;

    return this.http.get<About>(url);
  }
  getAboutByPersonId(id: number): Observable<About> {
    const url = `${this.url}/byperson/${id}`;
    return this.http.get<About>(url);
  }

  updateAbout(about: About): Observable<About> {
    const url = `${this.url}/update/${about.id}`;
    return this.http.put<About>(url, about).pipe(
      tap((newAbout: About) => this.log(`update About w/ id=${about.id}`)),
      catchError(this.handleError<About>('updateAbout'))
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
  /** Log a AboutService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`AboutService: ${message}`);
  }
  // #enddocregion log
}
