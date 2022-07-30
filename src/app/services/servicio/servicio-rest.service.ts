import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioRestService {
  httpOptions = new HttpHeaders().set('Content-Type','application/json');
  constructor(
    private http : HttpClient
  ) { }

  obtenerToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token=globalToken
    }else{
      token='';
    }
    return token;
  }

  agregar(params:any){
    return this.http.post(environment.baseUri + 'servicio/agregar', params, {headers:this.httpOptions.set('Authorization',this.obtenerToken())});
  }

  eliminar(params:any){
    return this.http.delete(environment.baseUri+'servicio/eliminar/' + params._id,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizar(params:any){
    return this.http.put(environment.baseUri+'servicio/actualizar/'+params._id, params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerServicios(){
    return this.http.get(environment.baseUri + 'servicio/servicios', {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  obtenerServicio(params:any){
    return this.http.get(environment.baseUri+'servicio/verServicio/'+params.servicios,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }


}
