import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PersonDetail } from 'src/app/interfaces/personDetail';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css'],
})
export class FormPersonComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personDetailId!: number;
  errMsj!: String;
  personDetailForm!: PersonDetail;
  resultado!: string;
  form!: FormGroup;

  constructor(
    private personDetailService: PersonService,
    private router: Router
  ) {
    this.personDetailForm = {
      id: 0,
      nombre: '',
      apellido: '',
      email: '',
      direccion: '',
    };
  }

  ngOnInit(): void {
    this.getPersonDetail(this.personDetailId);
    this.constructForm(this.personDetailForm);
  }

  onSubmit(person: PersonDetail): void {
    if (this.personDetailForm.id == 0) {
      this.personDetailService.addPersonDetail(person).subscribe(
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
      this.personDetailService
        .updatePerson({ ...person, id: this.personDetailForm.id })
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
  getPersonDetail(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.personDetailService.getById(id).subscribe(
        (data) => {
          this.personDetailForm = data[0];
          this.constructForm(this.personDetailForm);
        },
        (err) => {
          if (err.error.mensaje) {
            this.errMsj = err.error.mensaje;
          } else {
          }

          /*this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 3000,
          positionClass: 'toast-top-center',
        });*/
          console.log(err.error.mensaje);
        }
      );
    }
  }
  constructForm(person: PersonDetail): void {
    this.form = new FormGroup({
      nombre: new FormControl(person.nombre, [
        Validators.minLength(5),
        Validators.required,
      ]),
      apellido: new FormControl(person.apellido, [
        Validators.minLength(5),
        Validators.required,
      ]),
      email: new FormControl(person.email, [
        Validators.minLength(5),
        Validators.required,
      ]),
      direccion: new FormControl(person.direccion, [
        Validators.minLength(5),
        Validators.required,
      ]),
    });
  }

  get nombre() {
    return this.form.get('nombre')!;
  }
  get apellido() {
    return this.form.get('apellido')!;
  }
  get direccion() {
    return this.form.get('direccion')!;
  }
  get email() {
    return this.form.get('email')!;
  }
}
