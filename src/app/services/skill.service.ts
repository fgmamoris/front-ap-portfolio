import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Skill } from '../interfaces/skill';

@Injectable({
  providedIn: 'root',
})
export class SkillService {
  private url = environment.apiUrl + '/skill';

  constructor(private http: HttpClient) {}
  getSkills(): Observable<Skill[]> {
    const url = `${this.url}/`;
    return this.http.get<Skill[]>(url);
  }

  addSkill(skill: Skill, personId: number): Observable<Skill> {
    const url = `${this.url}/`;

    return this.http.post<Skill>(url, {
      nombreIcono: skill.nombreIcono,
      persona: {
        id: personId,
      },
    });
  }
  getById(id: number): Observable<Skill> {
    const url = `${this.url}/${id}`;
    return this.http.get<Skill>(url);
  }
  getSkillByPersonId(id: number): Observable<Skill> {
    const url = `${this.url}/byperson/${id}`;
    return this.http.get<Skill>(url);
  }

  updateSkill(skill: Skill): Observable<Skill> {
    const url = `${this.url}/${skill.id}`;
    return this.http.put<Skill>(url, skill);
  }

  /** DELETE: delete the skill from the server */

  deleteSkill(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}
