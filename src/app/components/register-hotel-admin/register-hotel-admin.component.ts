import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/models/user.model';
import { UserRestService } from 'src/app/services/user/user-rest.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-hotel-admin',
  templateUrl: './register-hotel-admin.component.html',
  styleUrls: ['./register-hotel-admin.component.css']
})
export class RegisterHotelAdminComponent implements OnInit {
  user: UserModel
  constructor(
    private userRest: UserRestService,
    private router : Router
  ) { 
    this.user = new UserModel('','','','','');
  }

  ngOnInit(): void {
  }

  agregarUserHotelAdmin(registerForm:any){
    this.userRest.agregarHotelAdmin(this.user).subscribe({
      next:(res:any)=>{
        alert(res.message);
        registerForm.reset();
        return this.router.navigateByUrl('/login');
      },error:(err)=>{
        alert(err.error.message||err.error);
      }
    })
  }

}
