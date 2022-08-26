import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  errMsj!: string;
  resultado!: string;
  addForm: boolean = false;
  exitsInterest: boolean = false;
  show!: boolean;

  constructor(
    private interestService: InterestService,
    private personService: PersonService,
    private tokenService: TokenService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPersonId();
    this.getToken();
    this.show = true;
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
        this.show = false;
      },
      (err) => {
        this.isLogged= false;
        this.tokenService.logOut()
        this.errMsj = err.message;
        console.log(this.errMsj);
        this.toastr.error(this.errMsj, 'Fail', {
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
        this.isLogged= false;
        this.tokenService.logOut()
        this.errMsj = err.message;
        console.log(this.errMsj);
        this.toastr.error(this.errMsj, 'Fail', {
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
