import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/services/session-storage.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(private sessionStorage : SessionStorageService, private router : Router) {

  }

  ngOnInit(): void {
    console.log('LogoutComponent token: '+this.sessionStorage.getItem('token'))
    this.sessionStorage.removeItem('token');
    console.log('LogoutComponent eliminado: '+this.sessionStorage.getItem('token'))
    console.log('LogoutComponent ordeid: '+this.sessionStorage.getItem('order'))
    this.sessionStorage.removeItem('order');
    console.log('LogoutComponent eliminado: '+this.sessionStorage.getItem('order'))
    this.router.navigate(['/']);
  }

}
