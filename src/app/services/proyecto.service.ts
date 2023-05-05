import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProyectoService {

  constructor(private httpClient: HttpClient) { }
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
}
