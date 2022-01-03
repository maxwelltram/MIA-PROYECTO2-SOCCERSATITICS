import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { NoticiasService } from 'src/app/services/noticias.service';

@Component({
  selector: 'app-noticias-cli',
  templateUrl: './noticias-cli.component.html',
  styleUrls: ['./noticias-cli.component.css']
})
export class NoticiasCliComponent implements OnInit {

  constructor(
    private router: Router,
    public noticiasService: NoticiasService

  ) { }

  ngOnInit(): void {
    this.noticias();
  }


  lista:any[]=[]

  noticias(){
      this.noticiasService.obtenerNoticias().subscribe((dataList: any)=>{
        this.lista=dataList["Noticias"];
        console.log("Listita",this.lista)
      })
    

  }


  Regresar(){
    this.router.navigate(['./usuarioHome'])
  }

}
