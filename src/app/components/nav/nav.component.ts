import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PersonDetail } from 'src/app/interfaces/personDetail';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  personDetail: PersonDetail = {
    id: 0,
    nombre: 'No hay persona cargada',
    email: '',
    apellido: '',
    direccion:
      'Deberá ingresar los datos de la persona para poder cargar el resto de los elementos',
  };
  isLogged = false;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private personService: PersonService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPersonDetail();
    this.getToken();
  }
  logOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  getPersonDetail(): void {
    this.personService.getPersonsDetail().subscribe(
      (data) => {
        if (data.length != 0) {
          this.personDetail = {
            id: data[0].id,
            nombre: data[0].nombre,
            email: data[0].email,
            apellido: data[0].apellido,
            direccion: data[0].direccion,
          };
        }
      },
      (err) => {
        this.isLogged = false;
        this.tokenService.logOut();
        this.errMsj = err.message;
        console.log(this.errMsj);
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });
        console.log(err.error.mensaje);
      }
    );
  }
}
