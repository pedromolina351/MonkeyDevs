import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../services/auth.services';
import { Location } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  formLogin!: FormGroup;
  public error: string = '';
  public mostrarPassword = false;
  errorLogin: boolean = false;
  usuarioLogueado: boolean = false;
  tokenInfo = {
    nombre: String,
    apellido: String
  } 

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuarioService,
    private cookieService: CookieService,
    private authService: AuthService,
    private location: Location) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]]
    });
    this.validarToken();
  }

  validarToken() {
    const token = this.cookieService.check('token');

    if (token) {
      this.usuarioLogueado = true;
      const id = this.authService.getUserData();
      console.log(id.nombre);
      this.tokenInfo.nombre = id.nombre;
      this.tokenInfo.apellido = id.apellido;
    }
  }

  cerrarSesion(){
    this.cookieService.delete('token');
    window.location.reload();
  }

  iniciarSesion() {
    const data = {
      correo: this.email?.value,
      password: this.password?.value
    }

    this.usuariosService.loginUsuario(data)
      .subscribe(
        res => {
          console.log(res);
          this.cookieService.set('token', res.token);
          this.router.navigate(['/home']);
        },
        error => {
          console.log(error);
          this.errorLogin = true;
        }
      )
  }


  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }

}


