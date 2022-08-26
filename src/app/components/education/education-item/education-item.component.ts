import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
    private router: Router,
    private toastr: ToastrService
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
    this.educationService.deleteEducation(id).subscribe(
      (data) => {
        this.toastr.error('Eliminación correcta', 'OK', {
          timeOut: 1500, positionClass: 'toast-top-center'
        });
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }, 1500);
      },
      (err) => {
        this.isLogged = false;
        this.tokenService.logOut();
        this.errMsj = err.message;
        console.log(this.errMsj);
        this.toastr.error(this.errMsj, 'Fail', {
          timeOut: 1500, positionClass: 'toast-top-center',
        });
        setTimeout(() => {
          this.router.navigate(['/']).then(() => {
            window.location.reload();
          });
        }, 1500);

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
