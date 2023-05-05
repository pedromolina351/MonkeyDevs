import { Component } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import { AuthService } from '../services/auth.services';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  htmlCode = '';
  cssCode = '';
  jsCode = '';

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService
    ) { }

  generarSalida(event: Event): void {
    console.log(this.htmlCode, this.cssCode, this.jsCode);
    const iframe = document.getElementById('salida') as HTMLIFrameElement;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    const head = `
      <head>
        <style>${this.cssCode}</style>
        <script>${this.jsCode}</script>
      </head>
    `;

    const body = `
      <body>
        ${this.htmlCode}
      </body>
    `;

    iframeDoc!.open();
    iframeDoc!.write(head + body);
    iframeDoc!.close();
  }



  guardarProyecto() {
    const tokenInfo = this.authService.getUserData();
    const data = {
      nombreProyecto: "Proyecto nuevo",
      descripcion: "Este proyecto fue creado en el frontend",
      archivoHTML: this.htmlCode,
      archivoJS: this.jsCode,
      archivoCSS: this.cssCode,
      usuario: tokenInfo.id
    }
    this.proyectoService.crearProyecto(data).subscribe(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
    )
  }
}




