import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';

@Component({
  selector: 'app-noticias-cli',
  templateUrl: './noticias-cli.component.html',
  styleUrls: ['./noticias-cli.component.css']
})
export class NoticiasCliComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }
  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }

}
