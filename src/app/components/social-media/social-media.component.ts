import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  show!: boolean;

  constructor(
    private tokenService: TokenService,
    private socialMediaService: SocialMediaService,
    private personService: PersonService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getToken();
    this.checkPerson(this.personId);
    this.show = true;
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
  }

  getSocialMedias(): void {
    this.socialMediaService.getAll().subscribe(
      (data) => {
        if (data.length != 0) {
          this.socials = data;
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
