import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel = new UsuarioModel;
  constructor(
    private _auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() { 
    // this.usuario = new UsuarioModel; 
  }

  onSubmit(form: NgForm) {
    
    if(form.invalid) {return};

    Swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Espere por favor',
    })
    
    this._auth.nuevoUsuario( this.usuario).subscribe(res => {
      console.log(res);
      Swal.close();
      this.router.navigateByUrl('/home');
    }, (err) => {
      console.log(err.error.error.message);
      Swal.fire({
        title:'Error al autenticar',
        icon: 'error',
        text: err.error.error.message
      })
    })
  }


}
