import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  usuario: UsuarioModel = new UsuarioModel;
  recordarme = false;

  constructor( 
    private _auth: AuthService,
    private router: Router
    ) { }

  ngOnInit() {
    if(localStorage.getItem('email')) {
      this.usuario.email = localStorage.getItem('email');
      this.recordarme = true;
    }

  }

  login(form: NgForm) {
    
    if (form.invalid) { return; };

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    })
    Swal.showLoading();

    this._auth.login( this.usuario ).subscribe(res => {
      console.log(res);
      Swal.close();

      if( this.recordarme ) {
        localStorage.setItem('email', this.usuario.email);
      }else {
        localStorage.removeItem('email');
      }

      this.router.navigateByUrl('/home');

    }, (err => {
      console.log(err.error.error);
      Swal.fire({
        title:'Error al autenticar',
        icon: 'error',
        text: err.error.error.message
      })
    })) 

  }

}
