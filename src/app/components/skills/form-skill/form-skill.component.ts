import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.css'],
})
export class FormSkillComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() idSkill!: number;
  errMsj!: String;
  skillDetailForm!: Skill;
  resultado!: string;
  form!: FormGroup;

  constructor(private skillService: SkillService, private router: Router, private toastr: ToastrService) {
    this.skillDetailForm = {
      id: 0,
      nombreIcono: '',
    };
  }

  ngOnInit(): void {
    this.getSkill(this.idSkill);
    this.constructForm(this.skillDetailForm);
    //this.fechaTest = new Date();
  }
  onSubmit(skill: Skill): void {
    if (this.idSkill == 0) {
      this.skillService.addSkill(skill, this.personId).subscribe(
        (data) => {
          this.form!.reset();
          this.handlerCancel();

          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
          /*this.toastr.success('Producto Creado', 'OK', {
            timeOut: 3000, positionClass: 'toast-top-center'
          });*/
          //this.router.navigate(['/lista']);
        },
        (err) => {
          console.log(err.error.mensaje);
          /*this.toastr.error(err.error.mensaje, 'Fail', {
            timeOut: 3000,  positionClass: 'toast-top-center',
          });
          // this.router.navigate(['/']);
          */
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
              timeOut: 1500, positionClass: 'toast-top-center'
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
            console.log(err.error.mensaje);
            this.toastr.error(err.error.mensaje, 'Fail', {
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
  }
  getSkill(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.skillService.getById(id).subscribe(
        (data) => {
          this.skillDetailForm = data;

          this.constructForm(this.skillDetailForm);
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
      //this.educationItemForm.fechaFin:null;
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
