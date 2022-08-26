import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Experience } from '../interfaces/experience';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExperienceService {
  private url = environment.apiUrl + '/experience';
  constructor(private http: HttpClient) {}
  /** GET Experiences from the server*/
  getAll(): Observable<Experience[]> {
    const url = `${this.url}/`;
    return this.http.get<Experience[]>(url);
  }

  //POST: add a new Experience
  addExperience(
    experience: Experience,
    personId: number
  ): Observable<Experience> {
    const url = `${this.url}/`;
    return this.http.post<Experience>(url, {
      ...experience,
      persona: {
        id: personId,
      },
    });
  }

  /**
   *
   * @param id param id Experience get
   * @returns Experience entity
   */
  getExperienceById(id: number): Observable<Experience> {
    const url = `${this.url}/${id}`;
    return this.http.get<Experience>(url);
  }

  updateExperience(experience: Experience): Observable<Experience> {
    const url = `${this.url}/${experience.id}`;
    return this.http.put<Experience>(url, experience);
  }
  /* DELETE: delete the Experience from the server
   */
  deleteExperience(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}
