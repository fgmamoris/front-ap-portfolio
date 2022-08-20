import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { SocialMedia } from 'src/app/interfaces/social-media';
import { SocialMediaService } from 'src/app/services/socialMedia.service';

@Component({
  selector: 'app-form-social',
  templateUrl: './form-social.component.html',
  styleUrls: ['./form-social.component.css'],
})
export class FormSocialComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() idSocial!: number;
  errMsj!: String;
  socialDetailForm!: SocialMedia;
  resultado!: string;
  form!: FormGroup;
  //reg: string = '(https?: \/\/)?(www\.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)|(https?:\/\/)?(www\.)?(?!ww)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)'
  reg: string = '@^(http\:\/\/|https\:\/\/)?([a-z0-9][a-z0-9\-]*\.)+[a-z0-9][a-z0-9\-]*$@i'



  constructor(
    private socialService: SocialMediaService,
    private router: Router, private toastr: ToastrService
  ) {
    this.socialDetailForm = {
      id: 0,
      nombreIcono: '',
      urlRedSocial: '',
    };
  }

  ngOnInit(): void {
    this.getSocialDetail(this.idSocial);
    this.constructForm(this.socialDetailForm);
  }

  onSubmit(social: SocialMedia): void {
    if (this.idSocial == 0) {
      this.socialService.addSocial(social, this.personId).subscribe(
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
      this.socialService
        .updateSocial({
          ...social,
          id: this.socialDetailForm.id,
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
  getSocialDetail(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.socialService.getSocialById(id).subscribe(
        (data) => {
          this.socialDetailForm = data;

          this.constructForm(this.socialDetailForm);
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
  constructForm(social: SocialMedia): void {
    this.form = new FormGroup({
      nombreIcono: new FormControl(social.nombreIcono, [
        //Validators.pattern('fa-[a-zA-Z0-9-]+ fa-[a-zA-Z0-9-]+'),
        Validators.minLength(5),
        Validators.required,
      ]),
      urlRedSocial: new FormControl(social.urlRedSocial, [
        Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'),
        Validators.required,
      ]),
    });
  }

  get nombreIcono() {
    return this.form.get('nombreIcono')!;
  }
  get urlRedSocial() {
    return this.form.get('urlRedSocial')!;
  }
}
