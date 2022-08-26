import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PersonDetail } from 'src/app/interfaces/personDetail';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-person-form',
  templateUrl: './form-person.component.html',
  styleUrls: ['./form-person.component.css'],
})
export class FormPersonComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personDetailId!: number;
  errMsj!: string;
  personDetailForm!: PersonDetail;
  resultado!: string;
  form!: FormGroup;
  show: boolean = true;

  constructor(
    private personDetailService: PersonService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
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
    this.show = true;
    if (this.personDetailForm.id == 0) {
      this.personDetailService.addPersonDetail(person).subscribe(
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
    } else {
      this.personDetailService
        .updatePerson({ ...person, id: this.personDetailForm.id })
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
  getPersonDetail(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.personDetailService.getById(id).subscribe(
        (data) => {
          this.personDetailForm = data[0];
          this.constructForm(this.personDetailForm);
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
  constructForm(person: PersonDetail): void {
    this.form = new FormGroup({
      nombre: new FormControl(person.nombre, [
        Validators.minLength(3),
        Validators.required,
      ]),
      apellido: new FormControl(person.apellido, [
        Validators.minLength(5),
        Validators.required,
      ]),
      email: new FormControl(person.email, [
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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
