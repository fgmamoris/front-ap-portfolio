import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Certificate } from '../interfaces/certificate';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private url = environment.apiUrl + '/certificate';
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getAll(): Observable<Certificate[]> {
    const url = `${this.url}/certificates`;
    return this.http.get<Certificate[]>(url);
    // // #enddocregion getCertificate
    // .pipe(
    //   // #enddocregion getCertificate-2
    //   tap((_) => this.log('fetched Certificates')),
    //   // #docregion getCertificate
    //   catchError(this.handleError<Certificate[]>('getCertificates', []))
    // )
    // #docregion Certificate
  }

  addCertificate(
    certificate: Certificate,
    personId: number
  ): Observable<Certificate> {
    const url = `${this.url}/create`;

    return this.http
      .post<Certificate>(url, {
        ...certificate,
        persona: {
          id: personId,
        },
      })
      .pipe(
        tap((newInterest: Certificate) =>
          this.log(`added Certificate w/ id=${certificate.id}`)
        ),
        catchError(this.handleError<Certificate>('addSkill'))
      );
  }
  getById(id: number): Observable<Certificate> {
    const url = `${this.url}/${id}`;
    return this.http.get<Certificate>(url);
    // .pipe(
    //   tap((_) => this.log(`fetched Certificate id=${id}`)),
    //   catchError(this.handleError<Certificate>(`get Certificate id=${id}`))
    // );
  }
  getCertificateByPersonId(id: number): Observable<Certificate> {
    const url = `${this.url}/byperson/${id}`;
    return this.http.get<Certificate>(url);
    // .pipe(
    //   tap((_) => this.log(`fetched Certificate id=${id}`)),
    //   catchError(this.handleError<Certificate>(`get Certificate id=${id}`))
    // );
  }

  updateCertificate(certificate: Certificate): Observable<Certificate> {
    const url = `${this.url}/update/${certificate.id}`;
    return this.http.put<Certificate>(url, certificate);
    // .pipe(
    //   tap((updateCertificate: Certificate) =>
    //     this.log(`update Certificate w/ id=${certificate.id}`)
    //   ),
    //   catchError(this.handleError<Certificate>('updateCertificate'))
    // );
  }

  /** DELETE: delete the Certificate from the server */

  deleteCertificate(id: number): Observable<any> {
    const url = `${this.url}/delete/${id}`;
    return this.http.delete<any>(url);
    // .pipe(
    //   tap((_) => this.log(`deleted Certificate id=${id}`)),
    //   catchError(this.handleError<any>('deleteCertificate'))
    // );
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
      if (error.error.mensaje != null) {
        console.error(error.error.mensaje); // log to console instead
      }
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
    this.messageService.add(`SCertificateService: ${message}`);
  }
  // #enddocregion log
}
