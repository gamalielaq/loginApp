import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;
  constructor( private _auth: AuthService) { }

  ngOnInit() {
  }

  login(form: NgForm) {
    
    if (form.invalid) { return; };

    this._auth.login( this.usuario ).subscribe(res => {
      console.log(res);
    }, (err => {
      console.log(err.error.error);
    })) 

  }

}
