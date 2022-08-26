import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.css'],
})
export class FormSkillComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() idSkill!: number;
  errMsj!: string;
  skillDetailForm!: Skill;
  resultado!: string;
  form!: FormGroup;
  show: boolean = true;

  constructor(
    private skillService: SkillService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.skillDetailForm = {
      id: 0,
      nombreIcono: '',
    };
  }

  ngOnInit(): void {
    this.getSkill(this.idSkill);
    this.constructForm(this.skillDetailForm);
  }
  onSubmit(skill: Skill): void {
    this.show = true;
    if (this.idSkill == 0) {
      this.skillService.addSkill(skill, this.personId).subscribe(
        (data) => {
          this.toastr.success('Creación correcta', 'OK', {
            timeOut: 1500,
            positionClass: 'toast-top-center',
          });
          this.form!.reset();
          this.handlerCancel();
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 1500);
        },
        (err) => {
          
          this.tokenService.logOut();
          this.errMsj = err.message;
          console.log(this.errMsj);
          this.toastr.error(this.errMsj, 'Fail', {
            timeOut: 1500,
            positionClass: 'toast-top-center',
          });
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 1500);
        }
      );
    } else {
      this.skillService
        .updateSkill({
          ...skill,
          id: this.skillDetailForm.id,
        })
        .subscribe(
          (data) => {
            this.toastr.success('Edición correcta', 'OK', {
              timeOut: 1500,
              positionClass: 'toast-top-center',
            });
            this.form!.reset();
            this.handlerCancel();
            setTimeout(() => {
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
            }, 1500);
          },
          (err) => {
            this.tokenService.logOut();
            this.errMsj = err.message;
            console.log(this.errMsj);
            this.toastr.error(this.errMsj, 'Fail', {
              timeOut: 1500,
              positionClass: 'toast-top-center',
            });
            setTimeout(() => {
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
            }, 1500);
          }
        );
    }
  }
  getSkill(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.skillService.getById(id).subscribe(
        (data) => {
          this.skillDetailForm = data;
          this.constructForm(this.skillDetailForm);
          this.show = false;
        },

        (err) => {
          this.tokenService.logOut();
          this.errMsj = err.message;
          console.log(this.errMsj);
          this.toastr.error(this.errMsj, 'Fail', {
            timeOut: 1500,
            positionClass: 'toast-top-center',
          });
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 1500);
        }
      );
    } else {
      this.show = false;
    }
  }
  constructForm(skill: Skill): void {
    this.form = new FormGroup({
      nombreIcono: new FormControl(skill.nombreIcono, [
        //Validators.pattern('fa-[a-zA-Z0-9-]+'),
        Validators.minLength(5),
        Validators.required,
      ]),
    });
  }

  get nombreIcono() {
    return this.form.get('nombreIcono')!;
  }
}
