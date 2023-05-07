import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private httpClient: HttpClient) { }

  //Obtener la lista de proyectos del usuario
  obtenerProyectos(id: any) {
    return this.httpClient.get(`https://monkeydevs-backend-production.up.railway.app/proyecto/${id}/proyectos`, {});
  }

  // Crear un nuevo proyecto
  crearProyecto(data: any): Observable<any> {
    return this.httpClient.post(`https://monkeydevs-backend-production.up.railway.app/proyecto/`,
      {
        nombreProyecto: data.nombreProyecto,
        descripcion: data.descripcion,
        archivoHTML: data.archivoHTML,
        archivoJS: data.archivoJS,
        archivoCSS: data.archivoCSS,
        usuario: data.usuario
      });
  }

  //Guardar los cambios realizados en un proyecto
  actualizarProyecto(data: any) {
    return this.httpClient.put(`https://monkeydevs-backend-production.up.railway.app/proyecto/update?id=${data.id}`,
      {
        nombreProyecto: data.nombreProyecto,
        descripcion: data.descripcion,
        archivoHTML: data.archivoHTML,
        archivoJS: data.archivoJS,
        archivoCSS: data.archivoCSS,
        usuario: data.usuario
      })
  }

  //Eliminar un proyecto
  eliminarProyecto(id: any) {
    return this.httpClient.delete(`https://monkeydevs-backend-production.up.railway.app/proyecto/${id}/eliminar`, {});
  }

  /***** PROYECTOS COOPERATIVOS  *****/

  //Obtener cooperativos del usuario
  obtenerCooperativos(id: any) {
    return this.httpClient.get(`https://monkeydevs-backend-production.up.railway.app/cooperativo/${id}`, {});
  }

  //Crear nuevo proyecto cooperativo
  crearCooperativo(data: any) {
    return this.httpClient.post(`https://monkeydevs-backend-production.up.railway.app/cooperativo/${data.idUsuario}`,
      {
        nombreProyecto: data.nombreProyecto,
        descripcion: data.descripcion,
        archivoHTML: data.archivoHTML,
        archivoJS: data.archivoJS,
        archivoCSS: data.archivoCSS,
        usuarios: [data.idUsuario]
      });
  }

  //Agregar usuario al proyecto
  agregarUsuario(data: any) {
    return this.httpClient.put(`https://monkeydevs-backend-production.up.railway.app/cooperativo/agregar`,
      {
        email: data.email,
        cooperativoId: data.cooperativoId
      })
  }

  //actualizar proyecto Cooperativo
  actualizarCooperativo(data:any) {
    return this.httpClient.put(`https://monkeydevs-backend-production.up.railway.app/cooperativo/update?id=${data.idCooperativo}`,
    {
      nombreProyecto: data.nombreProyecto,
      descripcion: data.descripcion,
      archivoHTML: data.archivoHTML,
      archivoJS: data.archivoJS,
      archivoCSS: data.archivoCSS,
      usuarios: data.usuarios
    })
  }
}
