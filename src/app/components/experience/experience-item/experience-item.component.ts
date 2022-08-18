import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Experience } from 'src/app/interfaces/experience';
import { ExperienceService } from 'src/app/services/experience.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-experience-item',
  templateUrl: './experience-item.component.html',
  styleUrls: ['./experience-item.component.css'],
})
export class ExperienceItemComponent implements OnInit {
  isLogged = false;
  @Input() experienceItem!: Experience;
  @Input() handlerEdit: any;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private experienceService: ExperienceService,
    private router: Router
  ) {}

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
    this.experienceService.deleteExperience(id).subscribe(
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
  getfecha(date: Date): String {
    return date !== null
      ? `${new Date(date).toISOString().slice(6, 7)} - ${new Date(date)
          .toISOString()
          .slice(0, 4)}`
      : '';
  }

  convertDateToNameMonth(date: Date): String {
    // date.setMonth(monthNumber - 1);

    // return date.toLocaleString('en-US', {
    //   month: 'long',
    // });
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

    return `${monthNames[new Date(date).getMonth()]} ${new Date(
      date
    ).getFullYear()}`;
    //return monthNames[date.getMonth()];
    // return date !== null
    //   ? `${new Date(date).toISOString().slice(6, 7)} - ${new Date(date)
    //       .toISOString()
    //       .slice(0, 4)}`
    //   : '';
  }
}
