import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { About } from 'src/app/interfaces/about';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-form-about',
  templateUrl: './form-about.component.html',
  styleUrls: ['./form-about.Component.css'],
})
export class FormAboutComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() exitsAbout!: boolean;
  errMsj!: String;
  AboutDetailForm!: About;
  resultado!: string;
  form!: FormGroup;

  constructor(private aboutService: AboutService, private router: Router) {
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
    if (!this.exitsAbout) {
      this.aboutService.addAbout(about, this.personId).subscribe(
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
      this.aboutService
        .updateAbout({
          id: this.AboutDetailForm.id,
          descripcion: about.descripcion,
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
  getAboutDetail(id: number): void {
    if (id !== 0 && id !== undefined && this.exitsAbout) {
      this.aboutService.getAboutByPersonId(id).subscribe(
        (data) => {
          this.AboutDetailForm = data;
          this.constructForm(this.AboutDetailForm);
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
    }
  }
  constructForm(about: About): void {
    
    this.form = new FormGroup({
      descripcion: new FormControl(about.descripcion, [
        Validators.minLength(5),
        Validators.required,
      ]),
    });
  }

  get descripcion() {
    return this.form.get('descripcion')!;
  }
}
