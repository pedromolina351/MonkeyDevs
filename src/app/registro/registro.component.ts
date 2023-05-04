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

  crearUsuario(){
    const data = {
      email:this.email?.value,
      password:this.password?.value
    }
    this.usuariosService.registrarse(data).
    subscribe(
      res => {
        //this.router.navigate(['/']);
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }

  cambiarPagina() {
    this.registro = false;
    this.planes = true;
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
  get email() { return this.formLogin.get('email'); }
  get password() { return this.formLogin.get('password'); }

}
