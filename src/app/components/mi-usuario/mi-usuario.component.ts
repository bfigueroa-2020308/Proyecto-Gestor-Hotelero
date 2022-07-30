import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mi-usuario',
  templateUrl: './mi-usuario.component.html',
  styleUrls: ['./mi-usuario.component.css']
})
export class MiUsuarioComponent implements OnInit {
  identity:any
  constructor(
    private userRest:UserRestService,
    private router :Router
  ) { 
    this.identity = this.userRest.obtenerIdentidad();
  }

  ngOnInit(): void {
  }

  actualizarUsuario(){
    this.userRest.actualizarUsuario(this.identity).subscribe({
      next:(res:any)=>{
        alert(res.message);
      },error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    })
  }

  eliminarUsuario(){
    this.userRest.eliminarUsuario(this.identity).subscribe({
      next:(res:any)=>{
        alert(res.message);
        this.router.navigateByUrl('/login');
      },error:(err)=>{
        console.log(err);
        alert(err.error.message||err.error);
      }
    });
  }

}
