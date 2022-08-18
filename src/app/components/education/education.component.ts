import { Component, Input, OnInit } from '@angular/core';
import { Education } from 'src/app/interfaces/education';
import { EducationService } from 'src/app/services/education.service';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  isLogged = false;
  educations: Education[] = [];
  errMsj!: string;
  addForm = false;
  editId: number = 0;
  personId: number = 0;

  constructor(
    private tokenService: TokenService,
    private educationService: EducationService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.getPersonId();
    this.getToken();
    this.getEducations();
  }

  handlerForm = (id: number): void => {
    this.editId = id;
    this.addForm = !this.addForm;
  };

  getPersonId(): void {
    this.personService.getPersonsDetail().subscribe(
      (data) => {
        if (data.length != 0) {
          this.personId = data[0].id;
          this.getEducations();
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

  getEducations(): void {
    this.educationService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.educations = data;
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
