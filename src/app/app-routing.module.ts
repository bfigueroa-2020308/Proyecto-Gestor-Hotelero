import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventoComponent } from './components/evento/evento.component';
import { FacturaComponent } from './components/factura/factura.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { LoginComponent } from './components/login/login.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterHotelAdminComponent } from './components/register-hotel-admin/register-hotel-admin.component';
import { RegisterComponent } from './components/register/register.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { UsuarioRegistradoComponent } from './components/usuario-registrado/usuario-registrado.component';

const routes: Routes = [
  {path:'', component:LoginComponent},
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'hoteles', component:HotelesComponent},
  {path:'habitaciones', component:HabitacionComponent},
  {path:'factura', component:FacturaComponent},
  {path:'reservacion', component:ReservacionComponent},
  {path:'hotelAdmin', component:RegisterHotelAdminComponent},
  {path:'eventos', component: EventoComponent},
  {path:'servicios', component:ServicioComponent},
  {path:'miCuenta', component:MiUsuarioComponent},
  {path:'registrados', component:UsuarioRegistradoComponent},
  {path:'**', component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
