import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonDetail } from 'src/app/interfaces/personDetail';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  personDetail!: PersonDetail;
  isLogged = false;
  addForm: boolean = false;
  errMsj!: string;
  id: number = 0;

  constructor(
    private personService: PersonService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getPersonDetail();
    this.getToken();
  }

  handlerForm = (id: number): void => {
    this.addForm = !this.addForm;
  };
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
        } else {
          this.personDetail = {
            id: 0,
            nombre: 'No hay persona cargada',
            email: '',
            apellido: '',
            direccion:
              'Deberá ingresar los datos de la persona para poder cargar el resto de los elementos',
          };
        }
      },
      (err) => {
        this.isLogged = false;
        this.errMsj = err.error.mensaje;
        /*this.toastr.error(this.errMsj, 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });*/
        console.log(err.error.mensaje);
      }
    );
  }
  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
