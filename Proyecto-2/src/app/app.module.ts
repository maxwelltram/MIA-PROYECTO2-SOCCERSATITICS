import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios
import { HttpClientModule, HttpClient}  from '@angular/common/http';

//Componentes 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarComponent } from './components/registrar/registrar.component';
import { ReportesComponent } from './components/reportes/reportes.component';
import { UsuarioHomeComponent } from './components/usuario-home/usuario-home.component';
import { EmpleadoHomeComponent } from './components/empleado-home/empleado-home.component';
import { ResetContraComponent } from './components/reset-contra/reset-contra.component';
import { MenuJugadoresComponent } from './components/menu-jugadores/menu-jugadores.component';
import { MenuDTComponent } from './components/menu-dt/menu-dt.component';
import { EstadiosComponent } from './components/estadios/estadios.component';
import { MenuPartidosComponent } from './components/menu-partidos/menu-partidos.component';
import { MenuCompetenciasComponent } from './components/menu-competencias/menu-competencias.component';
import { ConsultaComponent } from './components/consulta/consulta.component';
import { MenuEquiposComponent } from './components/menu-equipos/menu-equipos.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    AboutComponent,
    LoginComponent,
    RegistrarComponent,
    ReportesComponent,
    UsuarioHomeComponent,
    EmpleadoHomeComponent,
    ResetContraComponent,
    MenuJugadoresComponent,
    MenuDTComponent,
    EstadiosComponent,
    MenuPartidosComponent,
    MenuCompetenciasComponent,
    ConsultaComponent,
    MenuEquiposComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    APP_ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
