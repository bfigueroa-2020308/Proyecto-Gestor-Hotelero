import { Component, OnInit } from '@angular/core';
import { ServicioModel } from 'src/app/models/servicio.model';
import { ServicioRestService } from 'src/app/services/servicio/servicio-rest.service';
import { UserRestService } from 'src/app/services/user/user-rest.service';


@Component({
  selector: 'app-servicio',
  templateUrl: './servicio.component.html',
  styleUrls: ['./servicio.component.css']
})
export class ServicioComponent implements OnInit {
  servicios:any
  servicio:ServicioModel
  oneServicio: ServicioModel
  identity: any
  constructor(
    private servicioRest : ServicioRestService,
    private userRest : UserRestService
  ) { 
    this.servicio = new ServicioModel('',0);
    this.oneServicio = new ServicioModel('',0);
    this.identity = userRest.obtenerIdentidad();
  }

  ngOnInit(): void {
    this.obtenerServicios();
    console.log(this.identity.role);
  }

  obtenerServicios(){
    this.servicioRest.obtenerServicios().subscribe({
      next:(res:any)=>{
        this.servicios = res.servicios;
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  agregarServicio(form:any){
    return this.servicioRest.agregar(this.servicio).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.obtenerServicios()
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  eliminarServicio(servicio:any){
    return this.servicioRest.eliminar(servicio).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.obtenerServicios();
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  getOneServicio(servicio:any){
    this.oneServicio = servicio;
  }

  actualizarServicio(form:any){
    return this.servicioRest.actualizar(this.oneServicio).subscribe({
      next:(res:any)=>{
        alert(res.message);
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

}
