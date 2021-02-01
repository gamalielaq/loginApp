import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;
  constructor() { }

  ngOnInit() {
  }

  login(form: NgForm) {
    if (form.invalid) { return; };
    console.log("imprimir si el formulario es valido");
    console.log(form);
  }

}
