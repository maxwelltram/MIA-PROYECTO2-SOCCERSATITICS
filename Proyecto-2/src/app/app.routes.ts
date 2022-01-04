import { RouterModule, Routes } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AboutComponent } from "./components/about/about.component";
import { LoginComponent } from "./components/login/login.component";
import { RegistrarComponent } from "./components/registrar/registrar.component";
import { ReportesComponent} from "./components/reportes/reportes.component";
import { UsuarioHomeComponent } from "./components/usuario-home/usuario-home.component";
import { EmpleadoHomeComponent } from "./components/empleado-home/empleado-home.component";
import { ResetContraComponent } from "./components/reset-contra/reset-contra.component";
import { MenuJugadoresComponent } from "./components/menu-jugadores/menu-jugadores.component";
import { MenuEquiposComponent } from "./components/menu-equipos/menu-equipos.component";
import { EstadiosComponent } from "./components/estadios/estadios.component";
import { MenuDTComponent } from "./components/menu-dt/menu-dt.component";
import { MenuPartidosComponent } from "./components/menu-partidos/menu-partidos.component";
import { MenuCompetenciasComponent } from "./components/menu-competencias/menu-competencias.component";
import { NoticiasComponent } from "./components/noticias/noticias.component";
import { CrearUsuarioComponent } from "./components/crear-usuario/crear-usuario.component";
import { CargaMasivaComponent } from "./components/carga-masiva/carga-masiva.component";
import { NoticiasCliComponent } from "./components/noticias-cli/noticias-cli.component";
import { RegistrarJugadorComponent } from "./components/registrar-jugador/registrar-jugador.component";
import { RegistrarDTComponent } from "./components/registrar-dt/registrar-dt.component";
import { RegistrarEquipoComponent } from "./components/registrar-equipo/registrar-equipo.component";
import { RegistrarEstadioComponent } from "./components/registrar-estadio/registrar-estadio.component";
import { RegistrarPartidoComponent } from "./components/registrar-partido/registrar-partido.component";
import { RegistrarCompetenciaComponent } from "./components/registrar-competencia/registrar-competencia.component";
import { MembresiaComponent } from "./components/membresia/membresia.component";


const APP_ROUTES: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'about', component: AboutComponent},
    {path: 'login', component: LoginComponent},
    {path: 'registrar', component: RegistrarComponent},
    {path: 'reportes', component: ReportesComponent},
    {path: 'usuarioHome', component: UsuarioHomeComponent},
    {path: 'empleadoHome', component:EmpleadoHomeComponent},
    {path: 'resetContrasenia', component:ResetContraComponent},
    {path: 'jugadoresMenu', component:MenuJugadoresComponent},
    {path: 'equiposMenu', component:MenuEquiposComponent},
    {path: 'estadiosMenu', component:EstadiosComponent},
    {path: 'dtMenu', component:MenuDTComponent},
    {path: 'partidosMenu', component:MenuPartidosComponent},
    {path: 'competenciasMenu', component:MenuCompetenciasComponent},
    {path: 'noticias', component:NoticiasComponent},
    {path: 'usuarioP', component:CrearUsuarioComponent},
    {path: 'cargaMasiva', component:CargaMasivaComponent},
    {path: 'noticiasCli', component:NoticiasCliComponent},
    {path: 'registrarJugador', component:RegistrarJugadorComponent},
    {path: 'registrarDT', component:RegistrarDTComponent},
    {path: 'registrarEquipo', component:RegistrarEquipoComponent},
    {path: 'registrarEstadio', component:RegistrarEstadioComponent},
    {path: 'registrarPartido', component:RegistrarPartidoComponent},
    {path: 'registrarCompetencia', component:RegistrarCompetenciaComponent},
    {path: 'registrarNoticia', component:NoticiasComponent},
    {path: 'membresiaC', component:MembresiaComponent},
    {path: '**', pathMatch:'full', redirectTo:'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);