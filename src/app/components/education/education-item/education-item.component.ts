import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Education } from 'src/app/interfaces/education';
import { EducationService } from 'src/app/services/education.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-education-item',
  templateUrl: './education-item.component.html',
  styleUrls: ['./education-item.component.css'],
})
export class EducationItemComponent implements OnInit {
  isLogged = false;

  @Input() educationItem!: Education;
  @Input() handlerEdit: any;
  errMsj!: string;
  constructor(
    private tokenService: TokenService,
    private educationService: EducationService,
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
    this.educationService.deleteEducation(id).subscribe(
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
