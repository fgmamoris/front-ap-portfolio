import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Certificate } from '../interfaces/certificate';


@Injectable({
  providedIn: 'root',
})
export class CertificateService {
  private url = environment.apiUrl + '/certificate';
  constructor(
    private http: HttpClient,
  ) { }

  getAll(): Observable<Certificate[]> {
    const url = `${this.url}/`;
    return this.http.get<Certificate[]>(url);

  }

  addCertificate(
    certificate: Certificate,
    personId: number
  ): Observable<Certificate> {
    const url = `${this.url}/`;

    return this.http
      .post<Certificate>(url, {
        ...certificate,
        persona: {
          id: personId,
        },
      });

  }
  getById(id: number): Observable<Certificate> {
    const url = `${this.url}/${id}`;
    return this.http.get<Certificate>(url);

  }
  getCertificateByPersonId(id: number): Observable<Certificate> {
    const url = `${this.url}/byperson/${id}`;
    return this.http.get<Certificate>(url);

  }

  updateCertificate(certificate: Certificate): Observable<Certificate> {
    const url = `${this.url}/${certificate.id}`;
    return this.http.put<Certificate>(url, certificate);

  }

  /** DELETE: delete the Certificate from the server */

  deleteCertificate(id: number): Observable<any> {
    const url = `${this.url}/${id}`;
    return this.http.delete<any>(url);
  }
}