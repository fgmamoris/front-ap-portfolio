import { Component, Input, OnInit } from '@angular/core';
import { About } from 'src/app/interfaces/about';
import { AboutService } from 'src/app/services/about.service';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @Input() personId!: number;
  about: About = {
    id: 0,
    descripcion: '',
  };
  isLogged = false;
  addForm: boolean = false;
  errMsj!: string;
  exitsAbout: boolean = false;

  constructor(
    private aboutService: AboutService,
    private tokenService: TokenService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.getPersonId(this.personId);
    this.getToken();
  }

  handlerForm = (): void => {
    this.addForm = !this.addForm;
  };

  getPersonId(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.personService.getById(id).subscribe(
        (data) => {
          if (data.length != 0) {
            this.personId = data[0].id;
            this.getAboutDetail();
          }
        },
        (err) => {
          this.errMsj = err.error.mensaje;

          /*this.toastr.error(this.errMsj, 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });*/
          console.log(err.error.mensaje);
        }
      );
    } else {
      this.about = {
        id: 0,
        descripcion:
          'Deberá ingresar primero la persona para poder cargar la descripción',
      };
    }
  }
  getAboutDetail(): void {
    this.aboutService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.exitsAbout = true;
          this.about = data[0];
        } else
          this.about = {
            id: 0,
            descripcion:
              'No hay acerca de mi cargado',
          };
      },
      (err) => {
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
