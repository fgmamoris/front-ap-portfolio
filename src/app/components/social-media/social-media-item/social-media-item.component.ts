import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SocialMedia } from 'src/app/interfaces/social-media';
import { SocialMediaService } from 'src/app/services/socialMedia.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-social-media-item',
  templateUrl: './social-media-item.component.html',
  styleUrls: ['./social-media-item.component.css'],
})
export class SocialMediaItemComponent implements OnInit {
  isLogged = false;
  @Input() handlerEdit: any;
  @Input() socialItem!: SocialMedia;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private socialMediaService: SocialMediaService,
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
    this.socialMediaService.deleteSocial(id).subscribe(
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
}
