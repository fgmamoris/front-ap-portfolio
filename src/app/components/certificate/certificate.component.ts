import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  show: boolean = true;

  constructor(
    private tokenService: TokenService,
    private certificateService: CertificateService,
    private personService: PersonService,
    private router: Router,
    private toastr: ToastrService
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
        this.isLogged = false;
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

  getCertificates(): void {
    this.certificateService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.certificates = data;
        }
        this.show = false;
      },
      (err) => {
        this.isLogged = false;
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
  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
