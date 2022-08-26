import { HttpClient } from '@angular/common/http';
import { Injectable, ErrorHandler } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { SocialMedia } from '../interfaces/social-media';

@Injectable({
  providedIn: 'root',
})
export class SocialMediaService {
  private url = environment.apiUrl + '/socialmedia';

  constructor(private http: HttpClient) {}

  /** GET socialmedia from the server*/
  getAll(): Observable<SocialMedia[]> {
    const url = `${this.url}/`;
    return this.http.get<SocialMedia[]>(url);
    1;
  }

  //POST: add a new Social
  addSocial(social: SocialMedia, personId: number): Observable<SocialMedia> {
    const url = `${this.url}/`;
    const socialWithPerson = {
      ...social,
      persona: {
        id: personId,
      },
    };

    return this.http.post<SocialMedia>(url, socialWithPerson);
  }

  /**
   *
   * @param id param id social media get
   * @returns socialmedia entity
   */
  getSocialById(id: number): Observable<SocialMedia> {
    const url = `${this.url}/${id}`;
    return this.http.get<SocialMedia>(url);
  }

  updateSocial(social: SocialMedia): Observable<SocialMedia> {
    const url = `${this.url}/${social.id}`;
    return this.http.put<SocialMedia>(url, social);
  }
  /* DELETE: delete the social from the server
   */
  deleteSocial(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}
