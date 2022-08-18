import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Education } from 'src/app/interfaces/education';
import { EducationService } from 'src/app/services/education.service';

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

  form!: FormGroup;

  constructor(
    private educationService: EducationService,
    private router: Router
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
    //this.fechaTest = new Date();
  }
  onSubmit(education: any): void {
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
  constructForm(education: Education): void {
    this.form = new FormGroup({
      titulo: new FormControl(education.titulo, [
        Validators.minLength(5),
        Validators.required,
      ]),
      descripcion: new FormControl(education.descripcion),
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
}
