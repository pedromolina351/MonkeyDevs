import { Component } from '@angular/core';
import { AuthService } from '../services/auth.services';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent {
  usuario:any;
  token = this.authService.getUserData();
  idUser = this.token.id;
  nuevoNombre = '';
  nuevoApellido = '';
  mostrar:boolean = false;


  constructor(
    private authService: AuthService,
    private usuarioService: UsuarioService
    ){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.cargarDatosUsuario();
  }

  cargarDatosUsuario(){
    this.usuarioService.obtenerUsuario(this.idUser).subscribe(
      (res: any) => {
        console.log(res.usuario);
        this.usuario = res.usuario;
      },error => {
        console.log(error);
      }
    );
  }

  actualizarUsuario(){
    const data = {
      idUsuario: this.idUser,
      nombre: this.nuevoNombre,
      apellido: this.nuevoApellido,
      usuario: this.usuario.usuario,
      correo: this.usuario.correo,
      password: this.usuario.password,
      plan: this.usuario.plan
    }
    this.usuarioService.actualizarUsuario(data).subscribe(
      res => {
        console.log(res);
        this.cargarDatosUsuario();
      }, error => {
        console.log(error);
      }
    )
  }

  toggleDiv() {
    this.mostrar = true;
  }
  
  closeDiv(): void {
    const div2:any = document.getElementById("div-2");
    div2.style.display = "none";
  }
  
  
}
