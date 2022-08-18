import { Component, Input, OnInit } from '@angular/core';
import { PersonService } from 'src/app/services/person.service';
import { SocialMediaService } from 'src/app/services/socialMedia.service';
import { SocialMedia } from '../../interfaces/social-media';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-social-media',
  templateUrl: './social-media.component.html',
  styleUrls: ['./social-media.component.css'],
})
export class SocialMediaComponent implements OnInit {
  @Input() personId!: number;
  socials: SocialMedia[] = [];
  isLogged = false;
  addForm = false;
  errMsj!: string;
  idEdit: number = 0;

  constructor(
    private tokenService: TokenService,
    private socialMediaService: SocialMediaService,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.getToken();
    this.checkPerson(this.personId);
  }

  handlerForm = (id: number): void => {
    this.idEdit = id;
    this.addForm = !this.addForm;
  };

  checkPerson(id: number): void {
    if (id !== 0 && id !== undefined) {
      this.personService.getById(id).subscribe(
        (data) => {
          if (data.length != 0) {
            this.personId = data[0].id;
            this.getSocialMedias();
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
  }

  getSocialMedias(): void {
    this.socialMediaService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.socials = data;
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
