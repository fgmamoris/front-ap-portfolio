import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Skill } from '../interfaces/skill';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private url = environment.apiUrl + '/skill';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}
  getSkills(): Observable<Skill[]> {
    const url = `${this.url}/skills`;
    return (
      this.http
        .get<Skill[]>(url)
        // #enddocregion getSkills
        .pipe(
          // #enddocregion getSkill-2
          tap((_) => this.log('fetched Skills')),
          // #docregion getSkill
          catchError(this.handleError<Skill[]>('getSkill', []))
        )
    );
    // #docregion Skill
  }

  addSkill(skill: Skill, personId: number): Observable<Skill> {
    const url = `${this.url}/create`;

    return this.http
      .post<Skill>(url, {
        nombreIcono: skill.nombreIcono,
        persona: {
          id: personId,
        },
      })
      .pipe(
        tap((newSkill: Skill) => this.log(`added Skill w/ id=${skill.id}`)),
        catchError(this.handleError<Skill>('addSkill'))
      );
  }
  getById(id: number): Observable<Skill> {
    const url = `${this.url}/${id}`;
    return this.http.get<Skill>(url).pipe(
      tap((_) => this.log(`fetched Skill id=${id}`)),
      catchError(this.handleError<Skill>(`get Skill id=${id}`))
    );
  }
  getSkillByPersonId(id: number): Observable<Skill> {
    const url = `${this.url}/byperson/${id}`;
    return this.http.get<Skill>(url).pipe(
      tap((_) => this.log(`fetched Skill id=${id}`)),
      catchError(this.handleError<Skill>(`get Skill id=${id}`))
    );
  }

  updateSkill(skill: Skill): Observable<Skill> {
    const url = `${this.url}/update/${skill.id}`;
    return this.http.put<Skill>(url, skill).pipe(
      tap((updateSkill: Skill) => this.log(`update Skill w/ id=${skill.id}`)),
      catchError(this.handleError<Skill>('updateSkill'))
    );
  }

  /** DELETE: delete the skill from the server */

  deleteSkill(id: number): Observable<any> {
    const url = `${this.url}/delete/${id}`;

    return this.http.delete<any>(url).pipe(
      tap((_) => this.log(`deleted skill id=${id}`)),
      catchError(this.handleError<any>('deleteSkill'))
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
  /** Log a SkillService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SkillService: ${message}`);
  }
  // #enddocregion log
}
