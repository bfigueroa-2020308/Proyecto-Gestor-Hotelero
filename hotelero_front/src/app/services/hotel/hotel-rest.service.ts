import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelRestService {
  httpOptions = new HttpHeaders().set('Content-Type','application/json');
  constructor(
    private http : HttpClient
  ) { }

  obtenerToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token=globalToken;
    }else{
      token='';
    }
    return token;
  }

  agregarHotel(params:any){
    return this.http.post(environment.baseUri+'hotel/agregarHotel', params, {headers: this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  eliminarHotel(params:any){
    return this.http.delete(environment.baseUri + 'hotel/eliminar/'+params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarHotel(params:any){
    return this.http.put(environment.baseUri+'hotel/actualizar/'+params._id, params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  verHoteles(){
    return this.http.get(environment.baseUri+ 'hotel/hoteles',{headers:this.httpOptions});
  }

  verHotel(params:any){
    return this.http.get(environment.baseUri+'hotel/mostrarHotel/' + params._id, {headers: this.httpOptions});
  }

  buscarHotel(params:any){
    return this.http.post(environment.baseUri+'hotel/buscar', params, {headers:this.httpOptions});
  }

  buscarHotelAdmin(params:any){
    return this.http.get(environment.baseUri+'hotel/hotelAdmin/'+params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

}


