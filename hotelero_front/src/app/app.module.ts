import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelesComponent } from './components/hoteles/hoteles.component';
import { ReservacionComponent } from './components/reservacion/reservacion.component';
import { HabitacionComponent } from './components/habitacion/habitacion.component';
import { FacturaComponent } from './components/factura/factura.component';
import { HistorialComponent } from './components/historial/historial.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterHotelAdminComponent } from './components/register-hotel-admin/register-hotel-admin.component';
import { EventoComponent } from './components/evento/evento.component';
import { ServicioComponent } from './components/servicio/servicio.component';
import { MiUsuarioComponent } from './components/mi-usuario/mi-usuario.component';
import { UsuarioRegistradoComponent } from './components/usuario-registrado/usuario-registrado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HotelesComponent,
    ReservacionComponent,
    HabitacionComponent,
    FacturaComponent,
    HistorialComponent,
    NotFoundComponent,
    NavbarComponent,
    RegisterHotelAdminComponent,
    EventoComponent,
    ServicioComponent,
    MiUsuarioComponent,
    UsuarioRegistradoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
