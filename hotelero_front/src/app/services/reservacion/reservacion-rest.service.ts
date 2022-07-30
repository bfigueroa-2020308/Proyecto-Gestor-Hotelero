import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class ReservacionRestService {
  httpOptions = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private http:HttpClient
  ) { }

  obtenerToken(){
    let globalToken = localStorage.getItem('token');
    let token;
    if(globalToken!=undefined){
      token = globalToken;
    }else{
      token=''
    }
    return token;
  }

  

}
