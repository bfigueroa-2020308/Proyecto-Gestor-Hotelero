import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HabitacionRestService {
  httpOptions = new HttpHeaders().set('Authorization', 'application/json');
  constructor(
    private http : HttpClient
  ) { }

  obtenerToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token = globalToken;
    }else{
      token='';
    }
    return token;
  }

  agregarHabitacion(params:any){
    return this.http.post(environment.baseUri+'habitacion/agregar', params,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }
  
  eliminarHabitacion(params:any){
    return this.http.delete(environment.baseUri + 'habitacion/eliminar/' + params._id, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  actualizarHabitacion(params:any){
    return this.http.put(environment.baseUri + 'habitacion/actualizar/'+ params._id, params, {headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  verHabitaciones(){
    return this.http.get(environment.baseUri + 'habitacion/verHabitaciones', {headers:this.httpOptions});
  }

  verHabitacion(params:any){
    return this.http.get(environment.baseUri + 'habitacion/verHabitacion/' + params._id, {headers: this.httpOptions});
  }

  habitacionesDisponibles(params:any){
    return this.http.get(environment.baseUri + 'habitaciones/disponibles',{headers:this.httpOptions});
  }

  reservar(idH:any, idU:any,params:any){
    return this.http.post(environment.baseUri+'habitacion/reservar/'+idH+'/'+idU,params,{headers:this.httpOptions.set('Authorization', this.obtenerToken())});
  }

  HabitacionesPorHotel(params:any){
    return this.http.get(environment.baseUri + 'habitacion/habitacionesHotel/'+ params._id, {headers:this.httpOptions});
  }


}
