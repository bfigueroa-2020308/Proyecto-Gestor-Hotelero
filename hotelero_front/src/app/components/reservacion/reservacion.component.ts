import { Component, OnInit } from '@angular/core';
import { HabitacionRestService } from 'src/app/services/habitacion/habitacion-rest.service';
import { ServicioRestService } from 'src/app/services/servicio/servicio-rest.service';
import { ReservacionModel } from 'src/app/models/reservacion.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservacion',
  templateUrl: './reservacion.component.html',
  styleUrls: ['./reservacion.component.css']
})
export class ReservacionComponent implements OnInit {
  habitacion:any
  reservacion: ReservacionModel
  servicios:any
  date : any
  identity:any
  constructor(
    private habitacionRest : HabitacionRestService,
    private servicioRest: ServicioRestService,
    private userRest: UserRestService,
    private router : Router
  ) { 
    this.identity = this.userRest.obtenerIdentidad();
    this.date = '0000-00-00'
    let dateD=new Date(this.date)
    this.habitacion = this.getHabitacion();
    this.reservacion = new ReservacionModel(dateD, this.identity._id,this.habitacion._id,'')
  }

  ngOnInit(): void {
    this.getServicios();
  }

  getHabitacion(){
    let globalHabitacion = localStorage.getItem('habitacion');
    let habitacion;
    if(globalHabitacion!=undefined){
      habitacion=JSON.parse(globalHabitacion);
    }else{
      habitacion=''
    }
    return habitacion;
  }

  getServicios(){
    return this.servicioRest.obtenerServicios().subscribe({
      next:(res:any)=>{
        this.servicios = res.servicios
      },error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  agregarReservacion(form:any){
    return this.habitacionRest.reservar(this.habitacion._id, this.identity._id,this.reservacion).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.router.navigateByUrl('/factura');
        localStorage.setItem('reservacion', JSON.stringify(this.reservacion))
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

}
