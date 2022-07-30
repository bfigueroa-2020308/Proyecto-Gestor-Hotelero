import { Component, OnInit } from '@angular/core';
import { EventoModel } from 'src/app/models/evento.model';
import { EventoRestService } from 'src/app/services/evento/evento-rest.service';
import { UserRestService } from 'src/app/services/user/user-rest.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css']
})
export class EventoComponent implements OnInit {
  identity:any
  hotel:any
  eventos:any
  evento: EventoModel
  oneEvento:any
  token:any
  constructor(
    private userRest: UserRestService,
    private eventoRest: EventoRestService
  ) { 
    this.identity = userRest.obtenerIdentidad();
    this.hotel = this.obtenerHotel();
    this.evento = new EventoModel('','','', this.hotel._id);
    this.oneEvento = new EventoModel('','','',this.hotel._id)
    this.token = userRest.obtenerToken();
  }

  ngOnInit(): void {
    this.obtenerEventos();
  }

  obtenerHotel(){
    let globalHotel = localStorage.getItem('hotel');
    let hotel;
    if(globalHotel!=undefined){
      hotel = JSON.parse(globalHotel);
    }else{
      hotel=''
    }
    return hotel;
  }

  obtenerEventos(){
    if(this.hotel){
      return this.eventoRest.verEventosPorHotel(this.hotel).subscribe({
        next:(res:any)=>{
          this.eventos = res.eventosHotel;
        }, error:(err)=>{
          console.log(err);
          alert(err.error.message||err.error);
        }
      })
    }else if(this.token==''){
      return this.eventoRest.verEventos().subscribe({
        next:(res:any)=>{
          this.eventos = res.eventos;
        }, error:(err)=>{
          console.log(err);
          alert(err.error.message||err.error);
        }
      })
    }else{
      return console.log('se supone que no estes aqui');
    }
  }

  agregarEvento(form:any){
    return this.eventoRest.agregarEvento(this.evento).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.obtenerEventos()
        form.reset();
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  eliminarEvento(evento:any){
    return this.eventoRest.eliminarEvento(evento).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.obtenerEventos();
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  getOneEvento(evento:any){
    this.oneEvento = evento
  }

  actualizarEvento(form:any){
    this.eventoRest.actualizarEvento(this.oneEvento).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.obtenerEventos();
      }, error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

}
