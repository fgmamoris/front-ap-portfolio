import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Skill } from 'src/app/interfaces/skill';
import { PersonService } from 'src/app/services/person.service';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  personId: number = 0;
  isLogged = false;
  skills: Skill[] = [];
  errMsj!: string;
  addForm = false;
  idEdit: number = 0;
  show!: boolean;

  constructor(
    private tokenService: TokenService,
    private skillService: SkillService,
    private personService: PersonService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.getToken();
    this.checkPerson();
    this.show = true;
  }

  handlerForm = (id: number): void => {
    this.idEdit = id;

    this.addForm = !this.addForm;
  };

  checkPerson(): void {
    this.personService.getPersonsDetail().subscribe(
      (data) => {
        if (data.length != 0) {
          this.personId = data[0].id;
          this.getSkills();
        }

      },
      (err) => {
        this.isLogged = false;
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
  getSkills(): void {
    this.skillService.getSkills().subscribe(
      (data) => {
        if (data.length != 0) {
          this.skills = data;
        }
      },
      (err) => {
        this.isLogged = false;
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
    this.show = false;
  }

  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
