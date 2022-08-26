import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  show!: boolean;

  constructor(
    private tokenService: TokenService,
    private educationService: EducationService,
    private personService: PersonService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getPersonId();
    this.getToken();
    this.getEducations();
    this.show = true;
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
        this.isLogged = false;
        this.tokenService.logOut();
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

  getEducations(): void {
    this.educationService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.educations = data;
        }
        this.show = false;
      },
      (err) => {
        this.isLogged = false;
        this.tokenService.logOut();
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
