import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Education } from '../interfaces/education';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EducationService {
  private url = environment.apiUrl + '/education';

  constructor(private http: HttpClient) {}

  /** GET Educations from the server*/
  getAll(): Observable<Education[]> {
    const url = `${this.url}/`;
    return this.http.get<Education[]>(url);
  }

  //POST: add a new Education
  addEducation(education: Education, personId: number): Observable<Education> {
    const url = `${this.url}/`;
    return this.http.post<Education>(url, {
      ...education,
      persona: {
        id: personId,
      },
    });
  }

  /**
   *
   * @param id param id Education get
   * @returns Education entity
   */
  getEducationById(id: number): Observable<Education> {
    const url = `${this.url}/${id}`;
    return this.http.get<Education>(url);
  }

  updateEducation(education: Education): Observable<Education> {
    const url = `${this.url}/${education.id}`;
    return this.http.put<Education>(url, education);
  }
  /* DELETE: delete the Education from the server
   */
  deleteEducation(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}
