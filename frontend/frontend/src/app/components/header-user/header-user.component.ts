import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header-user',
  templateUrl: './header-user.component.html',
  styleUrls: ['./header-user.component.css']
})
export class HeaderUserComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor (private authService: AuthenticationService)
 {}
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
  }
}
