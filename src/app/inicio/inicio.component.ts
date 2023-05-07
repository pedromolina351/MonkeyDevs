import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ProyectoService } from '../services/proyecto.service';
import { AuthService } from '../services/auth.services';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { faFolder, faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  @ViewChild('nuevoProyecto') nuevoProyecto!: TemplateRef<any>;

  //VARIABLE PARA SABER SI EL PROYECTO ACTUAL ES COLABORATIVO O NO
  tipoProyectoActual = '';

  //Fontawesome icons
  faFolder = faFolder;
  faTrashCan = faTrashCan;
  faGear = faGear;

  //Archivos
  htmlCode = '';
  cssCode = '';
  jsCode = '';
  archivoCompleto: any;

  //Cargar proyecto
  proyectos: any;
  datosProyectoActual: any;
  proyectoActual: boolean = false;
  nombreProyectoActual = '';
  guardado: boolean = false;

  //Proyecto Cooperativo
  nombreNuevoCooperativo = '';
  descripcionNuevoCooperativo = '';
  cooperativos: any[] = [];
  correoUsuario = '';
  limiteCooperativo: boolean = false;
  cooperativoActual: any;
  usuarioExistente: boolean = false;
  limiteCrearCooperativo: boolean = false;

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
    this.cargarCooperativos();
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
  abrirConfirmarEliminacion(modal: any, id: string) {
    this.idProyectoEliminado = id;
    this.modalService.open(modal, {
      size: 'xs',
      centered: false
    });
  }
  abrirNuevoCooperativo(modal: any) {
    this.modalService.open(modal, {
      size: 'xs',
      centered: false
    });
  }
  abrirAgregarUsuario(modal: any, cooperativo: any) {
    this.cooperativoActual = cooperativo;
    this.modalService.open(modal, {
      size: 'xs',
      centered: false
    });
  }
  //----------------------------

  //Al hacer click en un proyecto, traer toda su informacion y mostrarla
  seleccionarProyectoNormal(proyecto: any) {
    this.tipoProyectoActual = 'normal';
    this.datosProyectoActual = proyecto;
    this.proyectoActual = true;
    this.nombreProyectoActual = proyecto.nombreProyecto;
    this.htmlCode = proyecto.archivoHTML;
    this.cssCode = proyecto.archivoCSS;
    this.jsCode = proyecto.archivoJS;
    this.modalService.dismissAll();
    console.log(this.tipoProyectoActual);
  }

  seleccionarProyectoCooperativo(proyecto: any) {
    this.tipoProyectoActual = 'cooperativo';
    this.cooperativoActual = proyecto;
    this.datosProyectoActual = proyecto;
    this.proyectoActual = true;
    this.nombreProyectoActual = proyecto.nombreProyecto;
    this.htmlCode = proyecto.archivoHTML;
    this.cssCode = proyecto.archivoCSS;
    this.jsCode = proyecto.archivoJS;
    console.log(this.tipoProyectoActual);
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
    if (this.tipoProyectoActual === 'normal') {
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
          });
    } else if (this.tipoProyectoActual === 'cooperativo') {
      const data = {
        idCooperativo: this.cooperativoActual._id,
        nombreProyecto: this.cooperativoActual.nombreProyecto,
        descripcion: this.cooperativoActual.descripcion,
        archivoHTML: this.htmlCode,
        archivoJS: this.jsCode,
        archivoCSS: this.cssCode,
        usuarios: this.cooperativoActual.usuarios
      }
      this.proyectoService.actualizarCooperativo(data).subscribe(
        res => {
          console.log(res);
          this.guardado = true;
          this.ocultarGuardado();
          this.cargarCooperativos();
        }, error => {
          console.log(error);
        }
      )
    }
  }

  //Eliminar un proyecto
  eliminarProyecto() {
    this.proyectoService.eliminarProyecto(this.idProyectoEliminado)
      .subscribe(
        res => {
          console.log(res);
          this.cargarProyectos();
          this.proyectoActual = false;
        }, error => {
          console.log(error);
        });
  }

  descargarArchivos(nombre: string) {
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

    this.archivoCompleto = '<html>' + head + body + '</html>';
    console.log(this.archivoCompleto);
    const blob = new Blob([this.archivoCompleto], { type: 'text/html;charset=utf-8' });
    saveAs(blob, nombre + '.html');
    console.log(this.archivoCompleto);
  }


  cargarCooperativos() {
    const tokenInfo = this.authService.getUserData();
    const idUser = tokenInfo.id;
    this.proyectoService.obtenerCooperativos(idUser).subscribe(
      (res: any) => {
        this.cooperativos = res.cooperativos;
        console.log(this.cooperativos);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  crearCooperativo() {
    const tokenInfo = this.authService.getUserData();
    const idUser = tokenInfo.id;
    const data = {
      nombreProyecto: this.nombreNuevoCooperativo,
      descripcion: this.descripcionNuevoCooperativo,
      archivoHTML: this.htmlCode,
      archivoJS: this.jsCode,
      archivoCSS: this.cssCode,
      usuarios: [idUser],
      idUsuario: idUser
    }
    this.proyectoService.crearCooperativo(data)
      .subscribe(
        res => {
          console.log(res);
          this.cargarCooperativos();
          this.limiteCrearCooperativo = false;
          this.modalService.dismissAll();
          this.htmlCode = '';
          this.cssCode = '';
          this.jsCode = '';
        }, error => {
          console.log(error);
          if (error.error.message === 'PROJECT_LIMIT') {
            this.limiteCrearCooperativo = true;
          }
        });
  }

  limpiar() {
    this.nombreNuevoCooperativo = '';
    this.descripcionNuevoCooperativo = '';
    this.limiteCrearCooperativo = false;
  }

  limpiarEliminar(){
    this.htmlCode = '';
    this.cssCode = '';
    this.jsCode = '';
  }
  limpiarCorreo(){
    this.correoUsuario = '';
    this.limiteCooperativo = false;
    this.usuarioExistente = false;
  }

  agregarUsuarioCooperativo() {
    const data = {
      email: this.correoUsuario,
      cooperativoId: this.cooperativoActual._id
    }
    console.log(data);
    this.proyectoService.agregarUsuario(data).subscribe(
      res => {
        console.log(res);
        this.limiteCooperativo = false;
        this.usuarioExistente = false;
      }, error => {
        console.log(error);
        if (error.error.message === 'PROJECT_LIMIT') {
          this.limiteCooperativo = true;
        }
        if (error.error.message === 'REPETIDO') {
          this.usuarioExistente = true;
        }
      }
    )
  }

  cerrarModalCooperativo() {
    this.correoUsuario = '';
    this.nombreNuevoCooperativo = '';
    this.limiteCooperativo = true;
    this.usuarioExistente = true;
    this.descripcionNuevoCooperativo = '';
  }

}