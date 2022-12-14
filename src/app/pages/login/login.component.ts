import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUser } from '../../models/loginUser';
import { AuthService } from '../../services/auth.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged = false;
  isLoginFail = false;
  loginUserModel!: LoginUser;
  userName!: string;
  password!: string;
  roles!: string[];
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.isLoginFail = false;
    }
  }
  onLogin(): void {
    this.loginUserModel = new LoginUser(this.userName, this.password);
    this.authService.login(this.loginUserModel).subscribe(
      (data) => {
        this.isLogged = true;
        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.toastr.success('Bienvenido ' + data.nombreUsuario, 'OK', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        this.isLoginFail = false;
        this.router.navigate(['/']);
      },
      (err) => {
        /********
         * CORREGIR MESSAGE POR MENSAJE QUE ES LO QUE RETORNA EL BACKEND
         */
        this.tokenService.logOut();
        this.isLoginFail = true;
        this.isLogged = false;
        err.error.mensaje !== undefined || err.error.mensaje !== null
          ? (this.errMsj = err.error.mensaje)
          : (this.errMsj = err.error.message);
        console.log(err);
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
      }
    );
  }
}
