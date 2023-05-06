import { Component } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import { AuthService } from '../services/auth.services';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faFolder } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  faFolder = faFolder;
  htmlCode = '';
  cssCode = '';
  jsCode = '';

  //Cargar proyecto
  proyectos:any;
  proyectoActual:boolean = false;
  nombreProyectoActual = '';

  //Nuevo proyecto
  nombreNuevo = '';
  descripcionNuevo = '';

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private modalService: NgbModal
    ) { }

  ngOnInit(): void{
    this.cargarProyectos();
  }

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


  abrirModalProyecto(modal:any){
    this.modalService.open(modal,{
      size:'xs',
      centered:false
    });
  }
  abrirModalNuevo(modal:any){
    this.modalService.open(modal,{
      size:'xs',
      centered:false
    });
  }

  seleccionarProyecto(proyecto:any){
    this.proyectoActual = true;
    this.nombreProyectoActual = proyecto.nombreProyecto;
    this.htmlCode = proyecto.archivoHTML;
    this.cssCode = proyecto.archivoCSS;
    this.jsCode = proyecto.archivoJS;
    this.modalService.dismissAll();
  }

  cargarProyectos(){
    const tokenInfo = this.authService.getUserData();
    const id = tokenInfo.id;
    this.proyectoService.obtenerProyectos(id).subscribe(
      res => {
        console.log(res);
        this.proyectos = res;
      }, error => {
        console.log(error);
      }
    )
  }

  //Funcion para guardar proyecto
  guardarProyecto() {
    const tokenInfo = this.authService.getUserData();
    const data = {
      nombreProyecto: this.nombreNuevo,
      descripcion: this.descripcionNuevo,
      archivoHTML: this.htmlCode,
      archivoJS: this.jsCode,
      archivoCSS: this.cssCode,
      usuario: tokenInfo.id
    }
    this.proyectoService.crearProyecto(data).subscribe(
      res => {
        console.log(res);
        this.cargarProyectos();
        this.nombreProyectoActual = this.nombreNuevo;
        this.proyectoActual = true;
        this.modalService.dismissAll();
        this.nombreNuevo = '';
        this.descripcionNuevo = '';
      },
      error => {
        console.log(error);
      }
    )
  }
}




