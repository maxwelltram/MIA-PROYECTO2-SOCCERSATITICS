import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { UploadService } from 'src/app/services/upload.service';

pdfMake.vfs=pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {

  constructor(
    private router: Router,
    public service: UploadService

  ) { }
  ngOnInit(): void {
  }



  varX: string =""
  lista: any[]=[];


  createPdf(valor){
    var usuario:{usuario: "este men", nombre: "perro"}

    const pdfDefinition : any={
      content:[

        {
          text: valor
        }
      ]
    }
    const pdf = pdfMake.createPdf(pdfDefinition);
    pdf.open();
  }


  usuariosSusEqui(){
    var equipo={nombre: this.varX};
    

    
    this.service.usuariosXequipo(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["usuarios"];
      console.log("Listita",this.lista)
      console.log(this.lista)
      var cadena=""
      for(let elemento of this.lista){
        cadena += elemento.NOMBRES + "\t"
        cadena += elemento.APELLIDOS + "\t"
        cadena += elemento.CORREO + "\n"
      }
      console.log(cadena)
      this.createPdf(cadena)

    })
    //this.createPdf(this.lista.toString())
  }

  usuariosConMem(){
    var equipo={nombre: this.varX};
    

    
    this.service.usuariosConMem(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["usuarios"];
      console.log("Listita",this.lista)
      console.log(this.lista)
      var cadena=""
      for(let elemento of this.lista){
        cadena += elemento.NOMBRES + "\t"
        cadena += elemento.APELLIDOS + "\t"
        cadena += elemento.CORREO + "\n"
      }
      console.log(cadena)
      this.createPdf(cadena)

    })
    //this.createPdf(this.lista.toString())
  }



  usuariosSinMem(){
    var equipo={nombre: this.varX};
    

    
    this.service.usuariosSinMem(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["usuarios"];
      console.log("Listita",this.lista)
      console.log(this.lista)
      var cadena=""
      for(let elemento of this.lista){
        cadena += elemento.NOMBRES + "\t"
        cadena += elemento.APELLIDOS + "\t"
        cadena += elemento.CORREO + "\n"
      }
      console.log(cadena)
      this.createPdf(cadena)

    })
    //this.createPdf(this.lista.toString())
  }



  usuariosXpais(){
    var equipo={nombre: this.varX};
    

    
    this.service.usuariosPais(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["usuarios"];
      console.log("Listita",this.lista)
      console.log(this.lista)
      var cadena=""
      for(let elemento of this.lista){
        cadena += elemento.NOMBRES + "\t"
        cadena += elemento.APELLIDOS + "\t"
        cadena += elemento.CORREO + "\n"
      }
      console.log(cadena)
      this.createPdf(cadena)

    })
    //this.createPdf(this.lista.toString())
  }
  usuariosXgenero(){
    var equipo={genero: this.varX};
    

    
    this.service.usuariosGen(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["usuarios"];
      console.log("Listita",this.lista)
      console.log(this.lista)
      var cadena=""
      for(let elemento of this.lista){
        cadena += elemento.NOMBRES + "\t"
        cadena += elemento.APELLIDOS + "\t"
        cadena += elemento.CORREO + "\n"
      }
      console.log(cadena)
      this.createPdf(cadena)

    })
    //this.createPdf(this.lista.toString())
  }


  noticias(){
    var equipo={genero: this.varX};
    

    
    this.service.empleadosNoticias(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["usuarios"];
      console.log("Listita",this.lista)
      console.log(this.lista)
      var cadena=""
      for(let elemento of this.lista){
        cadena += elemento.NOMBRES + "\t"
        cadena += elemento.NOTICIAS + "\n"
      }
      console.log(cadena)
      this.createPdf(cadena)

    })
    //this.createPdf(this.lista.toString())
  }

  noticiasEquipo(){
    var equipo={nombre: this.varX};
    

    
    this.service.empleadosNoticiasEqui(equipo).subscribe((dataList: any)=>{
      this.lista=dataList["usuarios"];
      console.log("Listita",this.lista)
      console.log(this.lista)
      var cadena=""
      for(let elemento of this.lista){
        cadena += elemento.NOMBRES + "\t"
        cadena += elemento.NOTICIAS + "\n"
      }
      console.log(cadena)
      this.createPdf(cadena)

    })
    //this.createPdf(this.lista.toString())
  }

}
