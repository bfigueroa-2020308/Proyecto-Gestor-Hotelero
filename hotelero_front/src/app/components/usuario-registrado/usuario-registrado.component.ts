import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';

@Component({
  selector: 'app-usuario-registrado',
  templateUrl: './usuario-registrado.component.html',
  styleUrls: ['./usuario-registrado.component.css']
})
export class UsuarioRegistradoComponent implements OnInit {
  users:any
  constructor(
    private userRest : UserRestService
  ) { }

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  obtenerUsuarios(){
    this.userRest.obtenerUsuarios().subscribe({
      next:(res:any)=>{
        this.users = res.users;
      },error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

}
