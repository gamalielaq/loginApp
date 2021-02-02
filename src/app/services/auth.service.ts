import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apikey = "AIzaSyBZyCPLqyFGrsdvnXkAindSuQH4vB9WPSA";
  userToken: string;

  // crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  constructor(
    private http: HttpClient
  ) {
    this.leerToken();
  }


  logout() {
    localStorage.removeItem('token');
  }

  login(usuario: UsuarioModel) {

    const authData = {
      ...usuario,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}signInWithPassword?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {

        this.guardarToken(resp['idToken']);
        return resp;

      })
    )

  }

  nuevoUsuario(usuario: UsuarioModel) {
    const authData = {
      ...usuario,
      // email: usuario.email,
      // password: usuario.password,
      returnSecureToken: true
    }

    return this.http.post(
      `${this.url}signUp?key=${this.apikey}`,
      authData
    ).pipe(
      map(resp => {

        this.guardarToken(resp['idToken']);
        return resp;
      })
    )
  }


  private guardarToken(idToken: string) {

    this.userToken = idToken;
    localStorage.setItem('token', idToken);

    let hoy = new Date();
    hoy.setSeconds(3600);

    localStorage.setItem('expira', hoy.getTime().toString());
  }

  leerToken() {

    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }

    return this.userToken;
  }

  estaAutenticado(): boolean {

    // 1° Forma
    const tokenExpiresDate = Number(localStorage.getItem('expira'));
    let currentDate = new Date();
    currentDate.setTime(tokenExpiresDate);

    return (this.userToken.length > 2 && (currentDate > new Date()))? true : false;


    // 2° Forma
    
    // if (this.userToken.length < 2) return false;

    // const expira = Number(localStorage.getItem('expira'));
    // const expiraDate = new Date();
    // expiraDate.setTime(expira);
    // return expiraDate > new Date();  


    // 3° Forma
    // if (expiraDate > new Date()) {
    //   return true;
    // } else {
    //   return false; // el token ya expiro
    // }

  }
}
