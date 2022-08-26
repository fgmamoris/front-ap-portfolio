import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Interest } from '../interfaces/interest';

@Injectable({
  providedIn: 'root',
})
export class InterestService {
  private url = environment.apiUrl + '/interest';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Interest[]> {
    const url = `${this.url}/`;
    return this.http.get<Interest[]>(url);
  }

  addInterest(interest: Interest, personId: number): Observable<Interest> {
    const url = `${this.url}/`;
    const interestWithPerson = {
      descripcion: interest.descripcion,
      persona: {
        id: personId,
      },
    };

    return this.http.post<Interest>(url, interestWithPerson);
  }
  getById(id: number): Observable<Interest> {
    const url = `${this.url}/${id}`;
    return this.http.get<Interest>(url);
  }
  getInterestByPersonId(id: number): Observable<Interest> {
    const url = `${this.url}/byperson/${id}`;
    return this.http.get<Interest>(url);
  }

  updateInterest(interest: Interest): Observable<Interest> {
    const url = `${this.url}/${interest.id}`;
    return this.http.put<Interest>(url, interest);
  }

  /** DELETE: delete the interes from the server */

  deleteInterest(id: number): Observable<any> {
    const url = `${this.url}/${id}`;

    return this.http.delete<Interest>(url);
  }
}
