import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { About } from 'src/app/interfaces/about';
import { AboutService } from 'src/app/services/about.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-form-about',
  templateUrl: './form-about.component.html',
  styleUrls: ['./form-about.Component.css'],
})
export class FormAboutComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() exitsAbout!: boolean;
  errMsj!: string;
  AboutDetailForm!: About;
  resultado!: string;
  form!: FormGroup;
  show: boolean = true;

  constructor(
    private aboutService: AboutService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.AboutDetailForm = {
      id: 0,
      descripcion: '',
    };
  }

  ngOnInit(): void {
    this.getAboutDetail(this.personId);
    this.constructForm(this.AboutDetailForm);
  }

  onSubmit(about: About): void {
    this.show = true;
    if (!this.exitsAbout) {
      this.aboutService.addAbout(about, this.personId).subscribe(
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
      this.aboutService
        .updateAbout({
          id: this.AboutDetailForm.id,
          descripcion: about.descripcion,
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
            this.errMsj = err.message;
            this.tokenService.logOut();
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
  getAboutDetail(id: number): void {
    if (id !== 0 && id !== undefined && this.exitsAbout) {
      this.aboutService.getAboutByPersonId(id).subscribe(
        (data) => {
          this.AboutDetailForm = data;
          this.constructForm(this.AboutDetailForm);
          this.show = false;
        },
        (err) => {
          this.errMsj = err.message;
          this.tokenService.logOut();
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
  constructForm(about: About): void {
    this.form = new FormGroup({
      descripcion: new FormControl(about.descripcion, [
        Validators.minLength(5),
        Validators.maxLength(10000),
        Validators.required,
      ]),
    });
  }

  get descripcion() {
    return this.form.get('descripcion')!;
  }
}
