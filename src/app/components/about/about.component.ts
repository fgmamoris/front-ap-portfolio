import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { About } from 'src/app/interfaces/about';
import { AboutService } from 'src/app/services/about.service';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  @Input() personId!: number;
  about: About = {
    id: 0,
    descripcion: '',
  };
  isLogged = false;
  addForm: boolean = false;
  errMsj!: string;
  exitsAbout: boolean = false;
  show!: boolean;

  constructor(
    private aboutService: AboutService,
    private tokenService: TokenService,
    private personService: PersonService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPersonId(this.personId);
    this.getToken();
    this.show = true;
  }

  handlerForm = (): void => {
    this.addForm = !this.addForm;
  };

  getPersonId(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.personService.getById(id).subscribe(
        (data) => {
          if (data.length != 0) {
            this.personId = data[0].id;
            this.getAboutDetail();
          }
        },
        (err) => {
          this.isLogged = false;
          this.tokenService.logOut();
          this.errMsj = err.message;
          this.toastr.error(this.errMsj, 'Fail', {
            timeOut: 1500,
            positionClass: 'toast-top-center',
          });
          this.tokenService.logOut();
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
  getAboutDetail(): void {
    this.aboutService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.exitsAbout = true;
          this.about = data[0];
          console.log(this.about);
        } else
          this.about = {
            id: 0,
            descripcion: 'No hay acerca de mi cargado',
          };
        this.show = false;
      },
      (err) => {
        this.isLogged = false;
        this.tokenService.logOut();
        this.errMsj = err.message;
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 1500,
          positionClass: 'toast-top-center',
        });
        this.tokenService.logOut();
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
