import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Certificate } from 'src/app/interfaces/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-form-certificate',
  templateUrl: './form-certificate.component.html',
  styleUrls: ['./form-certificate.component.css'],
})
export class FormCertificateComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() idCertificate!: number;
  errMsj!: string;
  certificateDetailForm!: Certificate;
  resultado!: string;
  form!: FormGroup;
  fechaString!: String;
  show: boolean = true;

  constructor(
    private certificateService: CertificateService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.certificateDetailForm = {
      id: 0,
      nombreCurso: '',
      urlCertificado: '',
      fecha: null,
    };
  }

  ngOnInit(): void {
    this.getCertificate(this.idCertificate);
    this.constructForm(this.certificateDetailForm);
  }
  onSubmit(certificate: Certificate): void {
    this.show = true;
    if (this.idCertificate === 0) {
      this.certificateService
        .addCertificate(certificate, this.personId)
        .subscribe(
          (data) => {
            console.log(data);
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
      this.certificateService
        .updateCertificate({
          ...certificate,
          id: this.certificateDetailForm.id,
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
    if (this.errMsj != null) {
      console.log(this.errMsj);
    }
  }
  getCertificate(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.certificateService.getById(id).subscribe(
        (data) => {
          this.certificateDetailForm = data;
          if (this.certificateDetailForm.fecha) {
            this.fechaString = this.convertDate(
              this.certificateDetailForm.fecha
            );
          }
          this.constructForm(this.certificateDetailForm);
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
  constructForm(certificate: Certificate): void {
    this.form = new FormGroup({
      nombreCurso: new FormControl(certificate.nombreCurso, [
        Validators.minLength(5),
        Validators.required,
      ]),
      urlCertificado: new FormControl(certificate.urlCertificado, [
        //Validators.pattern('(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'),
        //Validators.required,
      ]),
      fecha: new FormControl(this.fechaString, [Validators.required]),
    });
  }

  convertDate(date: Date): String {
    let year = new Date(this.certificateDetailForm.fecha!)
      .toISOString()
      .slice(0, 4);
    let month = new Date(this.certificateDetailForm.fecha!)
      .toISOString()
      .slice(5, 7);
    let day = new Date(this.certificateDetailForm.fecha!)
      .toISOString()
      .slice(8, 10);

    /*let yearN = +year;
    let monthN = +month;
    let dayN = +day;
    return new Date(yearN, monthN, dayN);*/
    return `${year}-${month}-${day}`;
  }

  onChangeDate(): void {
    this.certificateDetailForm.fecha = this.form.get('fecha')!.value;

    // some other important code here...
  }
  get nombreCurso() {
    return this.form.get('nombreCurso')!;
  }

  get fecha() {
    return this.form.get('fecha')!;
  }
}
