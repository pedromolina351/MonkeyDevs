import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private httpClient: HttpClient) { }
  
  //Funcion Login
  loginUsuario(data:any):Observable<any>{
    return this.httpClient.post('https://monkeydevs-backend-production.up.railway.app/usuario/login', 
    {
      correo: data.correo,
      password: data.password
    });
  }

  //Funcion Registrarse
  registrarse(data:any):Observable<any>{
    return this.httpClient.post('https://monkeydevs-backend-production.up.railway.app/usuario/registrar', 
    {
      nombre: data.nombre,
      apellido: data.apellido,
      usuario: data.usuario,
      correo: data.correo,
      password: data.password,
      plan: data.plan
    });
  }

  //Encontrar datos del usuario por id
  obtenerUsuario(id:any):Observable<any>{
    return this.httpClient.get(`https://monkeydevs-backend-production.up.railway.app/usuario/${id}`,{});
  }

  //Actualizar datos de un usuario
  actualizarUsuario(data:any):Observable<any>{
    return this.httpClient.put(`https://monkeydevs-backend-production.up.railway.app/usuario/update?id=${data.idUsuario}`,
    {
      idUsuario: data.idUsuario,
      nombre: data.nombre,
      apellido: data.apellido,
      usuario: data.usuario,
      correo: data.correo,
      password: data.password,
      plan: data.plan
    })
  }
}
