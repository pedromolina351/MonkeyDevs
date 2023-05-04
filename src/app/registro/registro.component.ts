import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registro: boolean = true;
  planes: boolean = false;
  planSeleccionado: number = 0;
  formLogin!: FormGroup;
  public error: string = '';
  errorUsuario: boolean = false;
  errorCorreo: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private usuariosService: UsuarioService) { }

  ngOnInit(): void {
    this.formLogin = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      usuario: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(60)]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.checkPasswords });
  }

  checkPasswords(formGroup: FormGroup) {
    const password = formGroup?.get('password')?.value;
    const confirmPassword = formGroup?.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  crearUsuario() {
    const data = {
      nombre: this.nombre?.value,
      apellido: this.apellido?.value,
      usuario: this.usuario?.value,
      correo: this.email?.value,
      password: this.password?.value,
      plan: this.planSeleccionado
    }
    this.usuariosService.registrarse(data).subscribe(
      res => {
        this.router.navigate(['/login']);
        console.log(res);
      },
      error => {
        if (error.error.message === 'USUARIO_DUPLICADO') {
          console.log('El usuario ya existe');
          this.errorUsuario = true;
        } else if (error.error.message === 'CORREO_DUPLICADO') {
          console.log('El correo ya está en uso');
          this.errorCorreo = true;
        } else {
          console.log('Otro error:', error);
        }
      }
    );
  }

  cambiarPagina() {
    this.registro = !this.registro;
    this.planes = !this.planes;
  }

  cambiarPlan(plan: number) {
    this.planSeleccionado = plan;
    console.log(plan);
    for (let i = 1; i <= 3; i++) {
      if (i != plan) {
        document.querySelector(`div.seleccionable:nth-child(${i})`)?.classList.remove('seleccionado');
      }
    }
  }
  get nombre() { return this.formLogin.get('nombre'); }
  get apellido() { return this.formLogin.get('apellido'); }
  get usuario() { return this.formLogin.get('usuario'); }
  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }

}
