import { Component, OnInit } from '@angular/core';
import { HotelModel } from 'src/app/models/hotel.model';
import { HotelRestService } from 'src/app/services/hotel/hotel-rest.service';
import { UserRestService } from 'src/app/services/user/user-rest.service';

@Component({
  selector: 'app-hoteles',
  templateUrl: './hoteles.component.html',
  styleUrls: ['./hoteles.component.css']
})
export class HotelesComponent implements OnInit {
  hoteles : any
  usuarios:any
  hotel: HotelModel
  identity:any
  oneHotel:any
  constructor(
    private hotelRest:HotelRestService,
    private userRest: UserRestService
  ) { 
    this.hotel = new HotelModel('','','');
    this.identity = this.userRest.obtenerIdentidad();
    this.oneHotel = new HotelModel('','','');
  }

  ngOnInit(): void {
    this.obtenerHoteles();
    this.obtenerUsuarios();
    localStorage.removeItem('hotel');
  }

  obtenerHoteles(){
    if(this.identity.role=='HOTELADMIN'){
      return this.hotelRest.buscarHotelAdmin(this.identity).subscribe({
        next:(res:any)=>{
          this.hoteles = res.hotel;
        }, error:(err)=>{
          alert(err.error.message||err.error);
        }
      })
    }else{
      return this.hotelRest.verHoteles().subscribe({
        next:(res:any)=>{
          this.hoteles = res.hoteles;
        }, error:(err)=>{
          alert(err.error.message||err.error);
        }
      })
    }
  }

  obtenerUsuarios(){
    return this.userRest.obtenerHotelAdmins().subscribe({
      next:(res:any)=>{
        this.usuarios = res.hotelAdmins;
      }, error:(err)=>{
        alert(err.error.message||err.error);
      }
    })
  }

  getHotelStorage(hotel:any){
    localStorage.setItem('hotel',JSON.stringify(hotel));
  }

  agregarHotel(hotelForm:any){
    return this.hotelRest.agregarHotel(this.hotel).subscribe({
      next:(res:any)=>{
        alert(res.message)
        hotelForm.reset();
        this.obtenerHoteles();
      }, error:(err)=>{
        console.log(err)
        alert(err.error.message||err.error);
      }
    })
  }

  eliminarHotel(hotel:any){
    return this.hotelRest.eliminarHotel(hotel).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.obtenerHoteles();
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  getOneHotel(hotel:any){
    this.oneHotel = hotel;
    console.log(this.oneHotel);
  }

  actualizar(form:any){
    return this.hotelRest.actualizarHotel(this.oneHotel).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.obtenerHoteles();
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

}
