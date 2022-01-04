import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Inicio', url: '/principal', icon: 'home' },
    { title: 'Mision, Vision', url: '/mision-vision', icon: 'paper-plane'},
    { title: 'Contactanos', url: '/contacto', icon: 'call' },
    { title: 'Aceca de', url: '/about', icon: 'football' },
    { title: 'Login', url: '/login', icon: 'log-in' },
    { title: 'Usuario', url: '/cliente', icon: 'man' }

  ];

  constructor() { }
}
