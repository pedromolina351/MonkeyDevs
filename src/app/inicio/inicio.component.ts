import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import { AuthService } from '../services/auth.services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faFolder, faTrashCan } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  @ViewChild('nuevoProyecto') nuevoProyecto!: TemplateRef<any>;

  //Fontawesome icons
  faFolder = faFolder;
  faTrashCan = faTrashCan;

  //Archivos
  htmlCode = '';
  cssCode = '';
  jsCode = '';

  //Cargar proyecto
  proyectos: any;
  datosProyectoActual:any;
  proyectoActual: boolean = false;
  nombreProyectoActual = '';
  guardado:boolean = false;

  //Nuevo proyecto
  nombreNuevo = '';
  descripcionNuevo = '';
  vacio: boolean = false;
  limite: boolean = false;

  //Eliminar proyecto
  idProyectoEliminado = '';

  constructor(
    private proyectoService: ProyectoService,
    private authService: AuthService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.cargarProyectos();
  }

  //Función que compila el código y lo muestra en la pantalla de salida
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
  // ---------------------------------------------------

  //Abrir ventanas modales
  abrirModalProyecto(modal: any) {
    this.modalService.open(modal, {
      size: 'xs',
      centered: false
    });
  }
  abrirModalNuevo(modal: any) {
    this.modalService.open(modal, {
      size: 'xs',
      centered: false
    });
  }
  abrirConfirmarEliminacion(modal:any,id:string){
    this.idProyectoEliminado = id;
    this.modalService.open(modal, {
      size: 'xs',
      centered: false
    });
  }
  //----------------------------

  //Al hacer click en un proyecto, traer toda su informacion y mostrarla
  seleccionarProyecto(proyecto: any) {
    this.datosProyectoActual = proyecto;
    this.proyectoActual = true;
    this.nombreProyectoActual = proyecto.nombreProyecto;
    this.htmlCode = proyecto.archivoHTML;
    this.cssCode = proyecto.archivoCSS;
    this.jsCode = proyecto.archivoJS;
    this.modalService.dismissAll();
  }

  //Cargar todos los proyectos del usuario logueado
  cargarProyectos() {
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
    //Verificar que los campos no estén vacios
    if (this.nombreNuevo !== '' || this.descripcionNuevo !== '') {
      this.proyectoService.crearProyecto(data).subscribe(
        res => {
          console.log(res);
          this.cargarProyectos();
          this.nombreProyectoActual = this.nombreNuevo;
          this.proyectoActual = true;
          this.modalService.dismissAll();
          this.nombreNuevo = '';
          this.descripcionNuevo = '';
          this.vacio = false;
        },
        error => {
          console.log(error);
          //Verificar que la cuenta no haya llegado al límite de proyectos
          if (error.error.message === 'LIMIT') {
            this.vacio = false;
            this.limite = true;
            console.log('Ha llegado al límite de proyectos')
          }
        }
      )
    } else { // Si los campos estan vacios mostrar un mensaje de error
      this.vacio = true;
      console.log('Intento guardar un proyecto sin nombre')
    }
  }
  //Limpiar inputs de la ventana modal #nuevoProyecto
  limpiarInputs() {
    this.nombreNuevo = '';
    this.descripcionNuevo = '';
    this.vacio = false;
    this.limite = false;
  }

  //Cerrar ventana modal #nuevoProyecto
  cerrarModal() {
    this.limpiarInputs();
    this.modalService.dismissAll(this.nuevoProyecto);
  }

  //Ocultar etiqueta guardado
  ocultarGuardado() {
    setTimeout(() => {
      this.guardado = false;
    }, 4000);
  }

  //Guardar los cambios hechos en un proyecto
  guardarCambiosProyecto() {
    const data = {
      id: this.datosProyectoActual._id,
      nombreProyecto: this.nombreProyectoActual,
      descripcion: this.datosProyectoActual.descripcion,
      archivoHTML: this.htmlCode,
      archivoJS: this.jsCode,
      archivoCSS: this.cssCode,
      usuario: this.datosProyectoActual.usuario
    }
    this.proyectoService.actualizarProyecto(data)
    .subscribe(
      res => {
        console.log(res);
        this.cargarProyectos();
        this.guardado = true;
        this.ocultarGuardado();
      }, error => {
        console.log(error);
      })
  }

  //Eliminar un proyecto
  eliminarProyecto(){
    this.proyectoService.eliminarProyecto(this.idProyectoEliminado)
    .subscribe(
      res => {
        console.log(res);
        this.cargarProyectos();
      }, error => {
        console.log(error);
      });
  }

}