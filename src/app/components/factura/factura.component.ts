import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { ServicioRestService } from 'src/app/services/servicio/servicio-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {
  identity:any
  servicio:any
  habitacion:any
  reservacion:any
  constructor(
    private userRest : UserRestService,
    private router : Router,
    private servicioRest : ServicioRestService
  ) { 
    this.identity = this.userRest.obtenerIdentidad();
    this.habitacion = this.getHabitacion();
    this.reservacion = this.getReservacion();
  }

  ngOnInit(): void {
    this.obtenerServicios()
  }

  obtenerServicios(){
    this.servicioRest.obtenerServicio(this.reservacion).subscribe({
      next:(res:any)=>{
        this.servicio = res.servicio;
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  getReservacion(){
    let globalReservacion = localStorage.getItem('reservacion');
    let reservacion;
    if(globalReservacion!=undefined){
      reservacion = JSON.parse(globalReservacion);
    }else{
      reservacion='';
    }
    return reservacion;
  }

  getHabitacion(){
    let globalHabitacion = localStorage.getItem('habitacion');
    let habitacion;
    if(globalHabitacion!=undefined){
      habitacion = JSON.parse(globalHabitacion);
    }else{
      habitacion='';
    }
    return habitacion;
  }

}
