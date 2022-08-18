import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Experience } from '../interfaces/experience';
import { MessageService } from './message.service';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private url = environment.apiUrl + '/experience';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  /** GET Experiences from the server*/
  getAll(): Observable<Experience[]> {
    const url = `${this.url}/experiences`;
    return (
      this.http
        .get<Experience[]>(url)
        // #enddocregion getExperience-1
        .pipe(
          // #enddocregion getExperience-2
          tap((_) => this.log('fetched Experiences')),
          // #docregion getExperiencees-2
          catchError(this.handleError<Experience[]>('getExperiences', []))
        )
    );
    // #docregion getExperience-1
  }

  //POST: add a new Experience
  addExperience(
    experience: Experience,
    personId: number
  ): Observable<Experience> {
    const url = `${this.url}/create`;
    return this.http
      .post<Experience>(url, {
        ...experience,
        persona: {
          id: personId,
        },
      })
      .pipe(
        tap((newExperience: Experience) =>
          this.log(`added experience w/ id=${personId}`)
        ),
        catchError(this.handleError<Experience>('addExperience'))
      );
  }

  /**
   *
   * @param id param id Experience get
   * @returns Experience entity
   */
  getExperienceById(id: number): Observable<Experience> {
    const url = `${this.url}/${id}`;
    return this.http.get<Experience>(url).pipe(
      tap((_) => this.log(`fetched Experience id=${id}`)),
      catchError(this.handleError<Experience>(`get Experience id=${id}`))
    );
  }

  updateExperience(experience: Experience): Observable<Experience> {
    const url = `${this.url}/update/${experience.id}`;
    return this.http.put<Experience>(url, experience).pipe(
      tap((newExperience: Experience) =>
        this.log(`update Experience w/ id=${experience.id}`)
      ),
      catchError(this.handleError<Experience>('updateExperience'))
    );
  }
  /* DELETE: delete the Experience from the server
   */
  deleteExperience(id: number): Observable<any> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete<any>(url).pipe(
      tap((_) => this.log(`deleted Experience id=${id}`)),
      catchError(this.handleError<any>('deleteExperience'))
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
  /** Log a ExperienceService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`ExperienceService: ${message}`);
  }
  // #enddocregion log
}
