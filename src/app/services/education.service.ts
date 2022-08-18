import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Education } from '../interfaces/education';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private url = environment.apiUrl + '/education';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET Educations from the server*/
  getAll(): Observable<Education[]> {
    const url = `${this.url}/educations`;
    return (
      this.http
        .get<Education[]>(url)
        // #enddocregion getEducation-1
        .pipe(
          // #enddocregion getEducation-2
          tap((_) => this.log('fetched Educations')),
          // #docregion getEducation-2
          catchError(this.handleError<Education[]>('getEducations', []))
        )
    );
    // #docregion getEducation-1
  }

  //POST: add a new Education
  addEducation(education: Education, personId: number): Observable<Education> {
    const url = `${this.url}/create`;
    return this.http
      .post<Education>(url, {
        ...education,
        persona: {
          id: personId,
        },
      })
      .pipe(
        tap((newEducation: Education) =>
          this.log(`added Education w/ id=${personId}`)
        ),
        catchError(this.handleError<Education>('addEducation'))
      );
  }

  /**
   *
   * @param id param id Education get
   * @returns Education entity
   */
  getEducationById(id: number): Observable<Education> {
    const url = `${this.url}/${id}`;
    return this.http.get<Education>(url).pipe(
      tap((_) => this.log(`fetched Education id=${id}`)),
      catchError(this.handleError<Education>(`get Education id=${id}`))
    );
  }

  updateEducation(education: Education): Observable<Education> {
    const url = `${this.url}/update/${education.id}`;
    return this.http.put<Education>(url, education).pipe(
      tap((newEducation: Education) =>
        this.log(`update Education w/ id=${education.id}`)
      ),
      catchError(this.handleError<Education>('updateEducation'))
    );
  }
  /* DELETE: delete the Education from the server
   */
  deleteEducation(id: number): Observable<any> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete<any>(url).pipe(
      tap((_) => this.log(`deleted Education id=${id}`)),
      catchError(this.handleError<any>('deleteEducation'))
    );
  }

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
    this.messageService.add(`ExperienceService: ${message}`);
  }
  // #enddocregion log
}
