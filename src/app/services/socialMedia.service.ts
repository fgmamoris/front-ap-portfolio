import { HttpClient } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocialMedia } from '../interfaces/social-media';
import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private url = environment.apiUrl + '/socialmedia';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  /** GET socialmedia from the server*/
  getAll(): Observable<SocialMedia[]> {
    const url = `${this.url}/socialmedias`;
    return (
      this.http
        .get<SocialMedia[]>(url)
        // #enddocregion getSocialMedias-1
        .pipe(
          // #enddocregion getSocialMedias-2
          tap((_) => this.log('fetched SocialMedias')),
          // #docregion getSocialMedias-2
          catchError(this.handleError<SocialMedia[]>('getSocialMedias', []))
        )
    );
    // #docregion getSocialMedias-1
  }

  //POST: add a new Social
  addSocial(social: SocialMedia, personId: number): Observable<SocialMedia> {
    const url = `${this.url}/create`;
    const socialWithPerson = {
      ...social,
      persona: {
        id: personId,
      },
    };

    return this.http.post<SocialMedia>(url, socialWithPerson).pipe(
      tap((newSocial: SocialMedia) =>
        this.log(`added social w/ id=${personId}`)
      ),
      catchError(this.handleError<SocialMedia>('addSocialMedia'))
    );
  }

  /**
   *
   * @param id param id social media get
   * @returns socialmedia entity
   */
  getSocialById(id: number): Observable<SocialMedia> {
    const url = `${this.url}/${id}`;
    return this.http.get<SocialMedia>(url).pipe(
      tap((_) => this.log(`fetched SocialMedia id=${id}`)),
      catchError(this.handleError<SocialMedia>(`get SocialMedia id=${id}`))
    );
  }

  updateSocial(social: SocialMedia): Observable<SocialMedia> {
    const url = `${this.url}/update/${social.id}`;
    return this.http.put<SocialMedia>(url, social).pipe(
      tap((newSocialMedia: SocialMedia) =>
        this.log(`update SocialMedia w/ id=${social.id}`)
      ),
      catchError(this.handleError<SocialMedia>('updateSocialMedia'))
    );
  }
  /* DELETE: delete the social from the server
   */
  deleteSocial(id: number): Observable<any> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete<any>(url).pipe(
      tap((_) => this.log(`deleted SocialMedia id=${id}`)),
      catchError(this.handleError<any>('deleteSocialMedia'))
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
  /** Log a SocialMediaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`SocialMediaService: ${message}`);
  }
  // #enddocregion log
}
