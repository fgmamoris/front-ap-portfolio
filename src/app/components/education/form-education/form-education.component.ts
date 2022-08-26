import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Education } from 'src/app/interfaces/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-form-education',
  templateUrl: './form-education.component.html',
  styleUrls: ['./form-education.component.css'],
})
export class FormEducationComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() idEducation!: number;
  educationItemForm!: Education;
  errMsj!: string;
  fechaInicioString!: string;
  fechaFinString!: string;
  show: boolean = true;
  form!: FormGroup;

  constructor(
    private educationService: EducationService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.educationItemForm = {
      id: 0,
      titulo: '',
      institucion: '',
      descripcion: '',
      fechaInicio: null,
      fechaFin: null,
    };
  }

  ngOnInit(): void {
    this.getEducacion(this.idEducation);
    this.constructForm(this.educationItemForm);
  }
  onSubmit(education: any): void {
    this.show = true;
    if (this.idEducation === 0) {
      this.educationService
        .addEducation(
          {
            id: education.id,
            titulo: education.titulo,
            institucion: education.institucion,
            descripcion: education.descripcion,
            fechaInicio: education.fechaInicioString,
            fechaFin: education.fechaFinString,
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
      this.educationService
        .updateEducation({
          id: this.educationItemForm.id,
          institucion: education.institucion,
          titulo: education.titulo,
          descripcion: education.descripcion,
          fechaInicio: education.fechaInicioString,
          fechaFin: education.fechaFinString,
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
  getEducacion(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.educationService.getEducationById(id).subscribe(
        (data) => {
          this.educationItemForm = data;
          if (this.educationItemForm.fechaInicio) {
            this.fechaInicioString = this.convertDate(
              this.educationItemForm.fechaInicio
            );
          }
          if (this.educationItemForm.fechaFin) {
            this.fechaFinString = this.convertDate(
              this.educationItemForm.fechaFin
            );
          }
          this.constructForm(this.educationItemForm);
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
  constructForm(education: Education): void {
    this.form = new FormGroup({
      titulo: new FormControl(education.titulo, [
        Validators.minLength(5),
        Validators.required,
      ]),
      descripcion: new FormControl(education.descripcion, [
        Validators.maxLength(10000),
      ]),
      institucion: new FormControl(education.institucion, [
        Validators.required,
        Validators.minLength(5),
      ]),
      fechaInicioString: new FormControl(
        this.fechaInicioString,
        Validators.required
        //Validators.minLength(2)
      ),
      fechaFinString: new FormControl(
        this.fechaFinString,
        Validators.required
        //Validators.minLength(2)
      ),
    });
  }

  convertDate(date: Date): string {
    let year = new Date(date).toISOString().slice(0, 4);
    let month = new Date(date).toISOString().slice(5, 7);
    let day = new Date(date).toISOString().slice(8, 10);
    return `${year}-${month}-${day}`;
  }

  onDateChangeStart(): void {
    this.educationItemForm.fechaInicio =
      this.form.get('fechaInicioString')!.value;
  }
  onDateChangeEnd(): void {
    this.educationItemForm.fechaFin = this.form.get('fechaFinString')!.value;
  }

  get titulo() {
    return this.form.get('titulo')!;
  }
  get institucion() {
    return this.form.get('institucion')!;
  }
  get fechaInicio() {
    return this.form.get('fechaInicioString')!;
  }
  get fechaFin() {
    return this.form.get('fechaFinString')!;
  }
  get descripcion() {
    return this.form.get('descripcion')!;
  }
}
