import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  show!: boolean;

  constructor(
    private personService: PersonService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPersonDetail();
    this.getToken();
    this.show = true;
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
        this.show = false;
      },
      (err) => {
        this.isLogged = false;
        this.tokenService.logOut()
        this.errMsj = err.message;
        console.log(this.errMsj);
        this.toastr.error(this.errMsj,'Fail', {
          timeOut: 1500, positionClass: 'toast-top-center',
        });
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }, 1500);
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
