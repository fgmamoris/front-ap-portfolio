import { Component, Input, OnInit } from '@angular/core';
import { TokenService } from '../../services/token.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isLogged = false;

  constructor(private tokenService: TokenService) {}

  ngOnInit(): void {
    this.getToken();
  }
  logOut(): void {
    this.tokenService.logOut();
    window.location.reload();
  }
  getToken(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  }
}
