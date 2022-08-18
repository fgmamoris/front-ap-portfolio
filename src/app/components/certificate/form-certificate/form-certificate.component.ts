import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Certificate } from 'src/app/interfaces/certificate';
import { CertificateService } from 'src/app/services/certificate.service';

@Component({
  selector: 'app-form-certificate',
  templateUrl: './form-certificate.component.html',
  styleUrls: ['./form-certificate.component.css'],
})
export class FormCertificateComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() idCertificate!: number;
  errMsj!: String;
  certificateDetailForm!: Certificate;
  resultado!: string;
  form!: FormGroup;
  fechaString!: String;

  constructor(
    private certificateService: CertificateService,
    private router: Router
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
    //this.fechaTest = new Date();
  }
  onSubmit(certificate: Certificate): void {
    if (this.idCertificate === 0) {
      this.certificateService
        .addCertificate(certificate, this.personId)
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
      this.certificateService
        .updateCertificate({
          ...certificate,
          id: this.certificateDetailForm.id,
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
  constructForm(certificate: Certificate): void {
    this.form = new FormGroup({
      nombreCurso: new FormControl(certificate.nombreCurso, [
        Validators.minLength(5),
        Validators.required,
      ]),
      urlCertificado: new FormControl(certificate.urlCertificado, [
        Validators.minLength(5),
        Validators.required,
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
  get urlCertificado() {
    return this.form.get('urlCertificado')!;
  }
  get fecha() {
    return this.form.get('fecha')!;
  }
}
