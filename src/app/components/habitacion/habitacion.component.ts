import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { HabitacionModel } from 'src/app/models/habitacion.model';
import { HabitacionRestService } from 'src/app/services/habitacion/habitacion-rest.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.css']
})
export class HabitacionComponent implements OnInit {
  hotel:any;
  habitaciones:any;
  habitacion:HabitacionModel
  identity:any
  oneHabitacion:any
  constructor(
    private userRest : UserRestService,
    private habitacionRest : HabitacionRestService 
  ) {
    this.identity = userRest.obtenerIdentidad();
    this.hotel = this.obtenerHotel();
    this.habitacion = new HabitacionModel(0,'',0,false,false,this.hotel._id,'');
    this.oneHabitacion = new HabitacionModel(0,'',0,false,false,this.hotel._id,'');
   }

  ngOnInit(): void {
    this.hotel = this.obtenerHotel();
    this.obtenerHabitaciones();
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

  obtenerHabitaciones(){
    return this.habitacionRest.HabitacionesPorHotel(this.hotel).subscribe({
      next:(res:any)=>{
        this.habitaciones = res.habitaciones
      },error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  agregarHabitacion(form:any){
    return this.habitacionRest.agregarHabitacion(this.habitacion).subscribe({
      next:(res:any)=>{
        alert(res.message)
        this.obtenerHabitaciones()
        form.reset();
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  eliminarHabitacion(habitacion:any){
    return this.habitacionRest.eliminarHabitacion(habitacion).subscribe({
      next:(res:any)=>{
        alert(res.message)
        this.obtenerHabitaciones();
      },error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  getOneHabitacion(habitacion:any){
    this.oneHabitacion = habitacion
    console.log(this.oneHabitacion);
  }

  actualizarHabitacion(form:any){
    return this.habitacionRest.actualizarHabitacion(this.oneHabitacion).subscribe({
      next:(res:any)=>{
        console.log(res.message);
        alert(res.message);
        this.obtenerHabitaciones()
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  obtenerHabitacionStorage(habitacion:any){
    localStorage.setItem('habitacion', JSON.stringify(habitacion))
  }

}
