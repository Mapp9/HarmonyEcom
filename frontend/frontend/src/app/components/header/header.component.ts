import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: boolean = false;
  isUser: boolean = false;
  isAdmin: boolean = false;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    // Inicializar el estado del navbar
    this.updateNavbar();

    // Suscribirse a los eventos del router para detectar cambios de ruta
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Actualizar el estado del navbar cuando se cambia de ruta
        this.updateNavbar();
      }
    });
  }

  // Método para actualizar el navbar basado en la autenticación y rol de usuario
  updateNavbar(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    const userRole = this.authService.getUserRole();

    // Reseteamos los valores de isAdmin e isUser
    this.isAdmin = false;
    this.isUser = false;

    // Condición para usuario ADMIN
    if (userRole === 'ADMIN') {
      this.isAdmin = true;
    }

    // Condición para usuario USER
    if (userRole === 'USER') {
      this.isUser = true;
    }
  }
}
