import { Component, OnInit } from '@angular/core';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { UserModel } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user:UserModel
  constructor(
    private userRest : UserRestService,
    private router : Router
  ) { 
    this.user = new UserModel('','','','','');
  }

  ngOnInit(): void {
  }

  register(registerForm: any){
    this.userRest.agregarUsuario(this.user).subscribe({
      next:(res:any)=>{
        alert(res.message);
        registerForm.reset();
        return this.router.navigateByUrl('/login');
      }, error:(err)=>{
        alert(err.error.message||err.error);
      }
    })
  }

}
