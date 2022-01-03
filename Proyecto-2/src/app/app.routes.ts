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

    {path: '**', pathMatch:'full', redirectTo:'home'}
];

export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES);