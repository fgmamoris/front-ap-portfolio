import { Component, Input, OnInit } from '@angular/core';
import { Experience } from 'src/app/interfaces/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.css'],
})
export class ExperienceComponent implements OnInit {
  isLogged = false;
  experiences: Experience[] = [];
  errMsj!: string;
  addForm = false;
  editId: number = 0;
  personId: number = 0;

  constructor(
    private tokenService: TokenService,
    private experienceService: ExperienceService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.getPersonId();
    this.getToken();
    this.getExperiences();
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
          this.getExperiences();
          //this.exitsPerson = true;
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

  getExperiences(): void {
    this.experienceService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.experiences = data;
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
