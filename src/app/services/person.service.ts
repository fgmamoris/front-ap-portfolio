import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { PersonDetail } from '../interfaces/personDetail';

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

  constructor(private http: HttpClient) {}

  getPersonsDetail(): Observable<PersonDetail[]> {
    const url = `${this.url}/`;
    return this.http.get<PersonDetail[]>(url);
  }
  addPersonDetail(person: PersonDetail): Observable<PersonDetail> {
    return this.http.post<PersonDetail>(
      `${this.url}/`,
      person,
      this.httpOptions
    );
  }

  getById(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.get<any>(url);
  }
  updatePerson(person: PersonDetail): Observable<PersonDetail> {
    const url = `${this.url}/${person.id}`;

    return this.http.put<PersonDetail>(url, person);
  }
  deleteById(id: number): Observable<Object> {
    const url = `${this.url}/${id}`;
    return this.http.delete(`${this.url}`);
  }
}
