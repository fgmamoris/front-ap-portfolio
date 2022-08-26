import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDto } from '../models/jwtDto';
import { HttpClient } from '@angular/common/http';
import { LoginUser } from '../models/loginUser';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authURL = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  public login(loginUsuario: LoginUser): Observable<JwtDto> {
    return this.httpClient.post<JwtDto>(this.authURL + '/auth/login', loginUsuario);
  }
}
