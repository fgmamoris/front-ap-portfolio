import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { Experience } from 'src/app/interfaces/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experience-form',
  templateUrl: './experience-form.component.html',
  styleUrls: ['./experience-form.component.css'],
})
export class ExperienceFormComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() idExperience!: number;
  experienceItemForm!: Experience;
  errMsj!: string;
  fechaInicioString!: string;
  fechaFinString!: string;
  form!: FormGroup;
  show: boolean = true;

  constructor(
    private experienceService: ExperienceService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.experienceItemForm = {
      id: 0,
      puesto: '',
      compania: '',
      descripcion: '',
      fechaInicio: null,
      fechaFin: null,
      actual: false,
    };
  }

  ngOnInit(): void {
    this.getExperience(this.idExperience);
    this.constructForm(this.experienceItemForm);
  }
  onSubmit(experience: any): void {
    this.show = false;
    if (this.idExperience === 0) {
      this.experienceService
        .addExperience(
          {
            id: this.experienceItemForm.id,
            puesto: experience.puesto,
            compania: experience.compania,
            descripcion: experience.descripcion,
            fechaInicio: experience.fechaInicioString,
            fechaFin: experience.fechaFinString,
            actual: experience.actual,
          },
          this.personId
        )
        .subscribe(
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
      this.experienceService
        .updateExperience({
          id: this.experienceItemForm.id,
          puesto: experience.puesto,
          compania: experience.compania,
          descripcion: experience.descripcion,
          fechaInicio: experience.fechaInicioString,
          fechaFin:
            experience.fechaFinString === undefined
              ? null
              : experience.fechaFinString,
          actual: experience.actual,
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
  getExperience(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.experienceService.getExperienceById(id).subscribe(
        (data) => {
          this.experienceItemForm = data;
          if (this.experienceItemForm.fechaInicio) {
            this.fechaInicioString = this.convertDate(
              this.experienceItemForm.fechaInicio
            );
          }
          if (this.experienceItemForm.fechaFin) {
            this.fechaFinString = this.convertDate(
              this.experienceItemForm.fechaFin
            );
          }

          this.constructForm(this.experienceItemForm);
          this.show = false;
        },
        (err) => {
          this.errMsj = err.error.mensaje;
          console.log(err.error.mensaje);
          this.toastr.error(err.error.mensaje, 'Fail', {
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
  constructForm(experience: Experience): void {
    this.form = new FormGroup(
      {
        puesto: new FormControl(experience!.puesto, [
          Validators.minLength(5),
          Validators.required,
        ]),
        compania: new FormControl(experience.compania, [
          Validators.required,
          Validators.minLength(5),
        ]),
        descripcion: new FormControl(
          experience.descripcion,
          Validators.maxLength(10000)
        ),
        fechaInicioString: new FormControl(
          this.fechaInicioString,
          Validators.required
          //Validators.minLength(2)
        ),
        fechaFinString: new FormControl(
          this.fechaFinString,
          //{ value: this.fechaFinString, disabled: experience.actual },
          Validators.required
        ),
        actual: new FormControl(experience.actual, Validators.required),
      }
      //{ validators: this.validarEnd }
    );
    this.setValidatorActual();
  }

  convertDate(date: Date): string {
    let year = new Date(date).toISOString().slice(0, 4);
    let month = new Date(date).toISOString().slice(5, 7);
    let day = new Date(date).toISOString().slice(8, 10);
    return `${year}-${month}-${day}`;
  }

  onDateChangeStart(): void {
    this.experienceItemForm.fechaInicio =
      this.form.get('fechaInicioString')!.value;
  }
  onDateChangeEnd(): void {
    this.experienceItemForm.fechaFin = this.form.get('fechaFinString')!.value;
  }
  onActualCheck(): void {
    this.experienceItemForm.actual = !this.experienceItemForm.actual;

    this.setValidatorActual();
  }
  setValidatorActual(): void {
    if (this.experienceItemForm.actual) {
      this.form.get('fechaFinString')?.clearValidators();
      this.form.get('fechaFinString ')?.updateValueAndValidity();
      this.form.get('actual')?.setValidators([Validators.required]);
      this.form.get('actual')?.updateValueAndValidity();
      setTimeout(() => {
        this.form.get('fechaFinString')?.disable();
      }, 10);
    } else {
      this.form.get('fechaFinString')?.enable();
      this.form.get('actual')?.clearValidators();
      this.form.get('actual ')?.updateValueAndValidity();
      this.form.get('fechaFinString')?.setValidators([Validators.required]);
      this.form.get('fechaFinString')?.updateValueAndValidity();
    }
  }

  get puesto() {
    return this.form.get('puesto')!;
  }
  get compania() {
    return this.form.get('compania')!;
  }

  get fechaInicio() {
    return this.form.get('fechaInicioString')!;
  }
  get fechaFin() {
    return this.form.get('fechaFinString')!;
  }
  get actual() {
    return this.form.get('actual')!;
  }
  get descripcion() {
    return this.form.get('descripcion')!;
  }
}
