import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private httpClient: HttpClient) { }

  //Obtener la lista de proyectos del usuario
  obtenerProyectos(id:any){
    return this.httpClient.get(`http://localhost:3000/proyecto/${id}/proyectos`,{});
  }

  // Crear un nuevo proyecto
  crearProyecto(data:any):Observable<any>{
    return this.httpClient.post(`http://localhost:3000/proyecto/`, 
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
  actualizarProyecto(data:any){
    return this.httpClient.put(`http://localhost:3000/proyecto/update?id=${data.id}`,
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
  eliminarProyecto(id:any){
    return this.httpClient.delete(`http://localhost:3000/proyecto/${id}/eliminar`,{})
  }
}
