import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  nombre = '';
  apellido = '';
  nombreUsuario = '';
  correoElectronico = '';

  constructor(
    private authService: AuthService
    ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const nombreTokens = this.authService.getUserData();
    const apellidoTokens = this.authService.getUserData();
    const nombreUsuarioTokens = this.authService.getUserData();
    const correoElectronico = this.authService.getUserData();

    this.nombre = nombreTokens.nombre;
    this.apellido = apellidoTokens.apellido;
    this.nombreUsuario = nombreUsuarioTokens.nombreUsuario;
    this.correoElectronico = correoElectronico.correoElectronico;
  }

  toggleDiv() {
    const div2:any = document.getElementById("div-2");
    div2.style.display = "block";
  }
  
  closeDiv(): void {
    const div2:any = document.getElementById("div-2");
    div2.style.display = "none";
  }
  
  
}
