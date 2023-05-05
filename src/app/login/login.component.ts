import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from '../services/usuario.service';
import { Router } from '@angular/router';

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

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]]
    });
  }

  iniciarSesion() {
    const data = {
      correo: this.email?.value,
      password: this.password?.value
    }

    this.usuariosService.loginUsuario(data)
      .subscribe(
        res => {
          this.router.navigate(['/home']);
          localStorage.setItem('token',res.token);
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
