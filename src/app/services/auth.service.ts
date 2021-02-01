import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = "https://identitytoolkit.googleapis.com/v1/accounts:";
  private apikey = "AIzaSyBZyCPLqyFGrsdvnXkAindSuQH4vB9WPSA";
  // crear nuevos usuarios
  // https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]

  // Login
  // https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]


  

  constructor(
    private http : HttpClient
  ) { } 


  logout() {

  }

  login(usuario: UsuarioModel) {

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
    )
  }


}
