import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { About } from '../interfaces/about';

@Injectable({
  providedIn: 'root',
})
export class AboutService {
  private url = environment.apiUrl + '/about';

  constructor(private http: HttpClient) {}

  getAll(): Observable<About[]> {
    const url = `${this.url}/`;
    return this.http.get<About[]>(url);
  }

  //POST: add a new about to the server
  addAbout(about: About, personId: number): Observable<About> {
    const url = `${this.url}/`;
    const aboutWithPerson = {
      descripcion: about.descripcion,
      persona: {
        id: personId,
      },
    };
    return this.http.post<About>(url, aboutWithPerson);
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
    const url = `${this.url}/${about.id}`;
    return this.http.put<About>(url, about);
  }
}
