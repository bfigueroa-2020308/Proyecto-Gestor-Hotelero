import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EventoRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http:HttpClient
  ) { }

  obtenerToken(){
    let globalToken=localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token=globalToken;
    }else{
      token =''
    }
    return token;
  }

  agregarEvento(params:any){
    return this.http.post(environment.baseUri + 'evento/agregar', params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  eliminarEvento(params:any){
    return this.http.delete(environment.baseUri + 'evento/eliminar/' + params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarEvento(params:any){
    return this.http.put(environment.baseUri + 'evento/actualizar/'+params._id,params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  verEventos(){
    return this.http.get(environment.baseUri+'evento/eventos', {headers:this.httpOptions});
  }

  verEvento(params:any){
    return this.http.get(environment.baseUri + 'evento/verEvento/'+params._id,{headers:this.httpOptions}); 
  }

  verEventosPorHotel(params:any){
    return this.http.get(environment.baseUri + 'evento/eventosHotel/'+params._id,{headers:this.httpOptions});
  }

}