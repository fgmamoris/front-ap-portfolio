import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Interest } from 'src/app/interfaces/interest';
import { InterestService } from 'src/app/services/interest.service';
import { PersonService } from 'src/app/services/person.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-form-interest',
  templateUrl: './form-interest.component.html',
  styleUrls: ['./form-interest.component.css'],
})
export class FormInterestComponent implements OnInit {
  @Input() handlerCancel: any;
  @Input() personId!: number;
  @Input() exitsInterest!: boolean;
  errMsj!: string;
  interestDetailForm!: Interest;
  resultado!: string;
  form!: FormGroup;
  show: boolean = true;

  constructor(
    private interestService: InterestService,
    private router: Router,
    private toastr: ToastrService,
    private tokenService: TokenService
  ) {
    this.interestDetailForm = {
      id: 0,
      descripcion: '',
    };
  }

  ngOnInit(): void {
    this.getInterstDetail(this.personId);
    this.constructForm(this.interestDetailForm);
  }

  onSubmit(interest: Interest): void {
    this.show = true;
    if (!this.exitsInterest) {
      this.interestService.addInterest(interest, this.personId).subscribe(
        (data) => {
          this.toastr.success('Creación correcta', 'OK', {
            timeOut: 1500,
            positionClass: 'toast-top-center',
          });
          this.form!.reset();
          this.handlerCancel();
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 1500);
        },
        (err) => {
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
    } else {
      this.interestService
        .updateInterest({
          ...interest,
          id: this.interestDetailForm.id,
        })
        .subscribe(
          (data) => {
            this.toastr.success('Edición correcta', 'OK', {
              timeOut: 1500,
              positionClass: 'toast-top-center',
            });
            this.form!.reset();
            this.handlerCancel();
            setTimeout(() => {
              this.router.navigate(['/']).then(() => {
                window.location.reload();
              });
            }, 1500);
          },
          (err) => {
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
  getInterstDetail(id: number): void {
    if (id !== 0 && id !== undefined && this.exitsInterest) {
      this.interestService.getInterestByPersonId(id).subscribe(
        (data) => {
          this.interestDetailForm = data;
          this.constructForm(this.interestDetailForm);
          this.show = false;
        },
        (err) => {
          this.tokenService.logOut();
          this.errMsj = err.message;
          console.log(this.errMsj);
          /*this.toastr.error(this.errMsj, 'Fail', {
            timeOut: 1500,
            positionClass: 'toast-top-center',
          });
          setTimeout(() => {
            this.router.navigate(['/']).then(() => {
              window.location.reload();
            });
          }, 1500);*/
        }
      );
    } else {
      this.show = false;
    }
  }
  constructForm(interest: Interest): void {
    this.form = new FormGroup({
      descripcion: new FormControl(interest.descripcion, [
        Validators.minLength(5),
        Validators.maxLength(10000),
        Validators.required,
      ]),
    });
  }

  get descripcion() {
    return this.form.get('descripcion')!;
  }
}
