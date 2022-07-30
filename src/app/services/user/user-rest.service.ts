import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http : HttpClient
  ) { }

  obtenerToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken != undefined){
      token = globalToken
    }else{
      token=''
    }
    return token
  }

  obtenerIdentidad(){
    let globalIdentity = localStorage.getItem('identity');
    let identity;
    if(globalIdentity!=undefined){
      identity = JSON.parse(globalIdentity);
    }else{
      identity=''
    }
    return identity
  }

  obtenerUsuarios(){
   return this.http.get(environment.baseUri + 'user/usuarios', {headers:this.httpOptions.set('Authorization', this.obtenerToken())})
  }

  obtenerUsuario(id:any){
    return this.http.get(environment.baseUri + 'user/usuario/' + id, {headers:this.httpOptions});
  }

  agregarUsuario(params:any){
    return this.http.post(environment.baseUri + 'user/agregarUsuario', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  agregarHotelAdmin(params:any){
    return this.http.post(environment.baseUri + 'user/agregarHotelAdmin', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  eliminarUsuario(params:any){
    return this.http.delete(environment.baseUri + 'user/eliminarUsuario/' + params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarUsuario(params:any){
    return this.http.put(environment.baseUri + 'user/actualizar/' + params._id, params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  login(params:any){
    return this.http.post(environment.baseUri + 'user/login', params, {headers:this.httpOptions});
  }

  obtenerHotelAdmins(){
    return this.http.get(environment.baseUri+'user/hotelAdmins', {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }
}
