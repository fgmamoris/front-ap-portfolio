import { Component, Input, OnInit } from '@angular/core';
import { Certificate } from 'src/app/interfaces/certificate';
import { CertificateService } from 'src/app/services/certificate.service';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.css'],
})
export class CertificateComponent implements OnInit {
  personId: number = 0;
  isLogged = false;
  certificates: Certificate[] = [];
  errMsj!: string;
  addForm = false;

  idEdit: number = 0;

  constructor(
    private tokenService: TokenService,
    private certificateService: CertificateService,
    private personService: PersonService
  ) {}

  ngOnInit(): void {
    this.getToken();
    this.getCertificates();
    this.checkPerson();
  }

  handlerForm = (id: number): void => {
    this.idEdit = id;
    this.addForm = !this.addForm;
  };
  checkPerson(): void {
    this.personService.getPersonsDetail().subscribe(
      (data) => {
        if (data.length != 0) {
          this.personId = data[0].id;
          this.getCertificates();
        }
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

  getCertificates(): void {
    this.certificateService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.certificates = data;
        }
      },
      (err) => {
        this.isLogged = false;
        this.errMsj = err.error.mensaje;
        /*this.toastr.error(this.errMsj, 'Fail', {
        timeOut: 3000,
        positionClass: 'toast-top-center',
      });*/
        console.log(err.error.mensaje);
      }
    );
  }
  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
