import { Component, Input, OnInit } from '@angular/core';
import { Interest } from 'src/app/interfaces/interest';
import { InterestService } from 'src/app/services/interest.service';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-interests',
  templateUrl: './interests.component.html',
  styleUrls: ['./interests.component.css'],
})
export class InterestsComponent implements OnInit {
  interest: Interest = {
    id: 0,
    descripcion: '',
  };
  isLogged = false;
  personId: number = 0;
  errMsj!: String;
  resultado!: string;
  addForm: boolean = false;
  exitsInterest: boolean = false;

  constructor(
    private interestService: InterestService,
    private personService: PersonService,
    private tokenService: TokenService
  ) {}

  ngOnInit(): void {
    this.getPersonId();
    this.getToken();
  }
  handlerForm = (): void => {
    this.addForm = !this.addForm;
  };
  getPersonId(): void {
    this.personService.getPersonsDetail().subscribe(
      (data) => {
        if (data.length != 0) {
          this.personId = data[0].id;
          this.getInterestDetail();
        } else {
          this.interest = {
            id: 0,
            descripcion:
              'Deberá ingresar primero la persona, para poder cargar el interes',
          };
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
  }
  getInterestDetail(): void {
    this.interestService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.exitsInterest = true;
          this.interest = data[0];
          
        } else {
          this.interest = {
            id: 0,
            descripcion: 'No hay intereses cargados',
          };
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
  }
  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
