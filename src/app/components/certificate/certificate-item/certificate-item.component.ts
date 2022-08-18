import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Certificate } from 'src/app/interfaces/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-certificate-item',
  templateUrl: './certificate-item.component.html',
  styleUrls: ['./certificate-item.component.css'],
})
export class CertificateItemComponent implements OnInit {
  isLogged = false;
  @Input() certificateItem!: Certificate;
  @Input() handlerEdit: any;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private certificateService: CertificateService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getToken();
  }

  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
  handlerRemove(id: number): void {
    this.certificateService.deleteCertificate(id).subscribe(
      (data) => {
        /*this.toastr.error(this.errMsj, 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });*/
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
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

  convertDateToNameMonth(date: Date): String {
    const monthNames = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    var date1 = date.toString()
    var numberOfMonth = +date1.slice(5, 7)
    var numberOfYear = +date1.slice(0, 4)
    return `${monthNames[numberOfMonth - 1]} ${numberOfYear}`;
  }
}
