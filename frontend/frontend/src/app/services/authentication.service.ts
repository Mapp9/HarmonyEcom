import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../common/user';
import { Observable } from 'rxjs';
import { Userdto } from '../common/userdto';
import { Jwtclient } from '../common/jwtclient';
import { jwtDecode, JwtPayload } from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl : string = 'http://localhost:8085/api/v1/security';

  constructor(private httpClient : HttpClient) { }


  registrer(user : User):Observable<User>{
    return this.httpClient.post<User>(this.apiUrl+"/registrer", user);
  }

  login(userDto:Userdto):Observable<Jwtclient>{
    return this.httpClient.post<Jwtclient>(this.apiUrl+"/login", userDto)
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }

  getToken(): string | null {
    return sessionStorage.getItem('token'); // O sessionStorage.getItem('token'), dependiendo de dónde lo guardes
  }
  decodeToken(token: string): JwtPayload | null {
    try {
      return jwtDecode<JwtPayload>(token); // Usamos la función jwtDecode
    } catch (Error) {
      return null;
    }
  }
  getUserRole(): string {
    const tokenData = this.getToken(); // Obtener el token u objeto completo
    if (tokenData) {
      // Suponiendo que el tokenData es un objeto con el campo 'type'
      const parsedToken = JSON.parse(tokenData); // Parseamos si es un string con formato JSON
      return parsedToken.type || ''; // Devolver el rol del usuario
    }
    return '';
  }
}
