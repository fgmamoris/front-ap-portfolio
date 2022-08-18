import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Skill } from 'src/app/interfaces/skill';
import { SkillService } from 'src/app/services/skill.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-skill-item',
  templateUrl: './skill-item.component.html',
  styleUrls: ['./skill-item.component.css'],
})
export class SkillItemComponent implements OnInit {
  isLogged = false;
  @Input() skillItem!: Skill;
  @Input() handlerEdit: any;
  errMsj!: string;

  constructor(
    private tokenService: TokenService,
    private skillService: SkillService,
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
    this.skillService.deleteSkill(id).subscribe(
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
