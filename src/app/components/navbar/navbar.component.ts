import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  token:any
  identity:any
  hotel:any
  constructor(
    private userRest : UserRestService
  ) { 
    this.token = userRest.obtenerToken();
    this.identity=userRest.obtenerIdentidad();
    this.hotel = this.obtenerHotel();
  }

  ngOnInit(): void {
  }

  obtenerHotel(){
    let globalHotel = localStorage.getItem('hotel');
    let hotel;
    if(globalHotel!=undefined){
      hotel=JSON.parse(globalHotel);
    }else{
      hotel=''
    }
    return hotel;
  }

  cerrarSesion(){
    localStorage.clear();
  }
  
}
