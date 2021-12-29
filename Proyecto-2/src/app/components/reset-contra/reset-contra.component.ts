import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reset-contra',
  templateUrl: './reset-contra.component.html',
  styleUrls: ['./reset-contra.component.css']
})
export class ResetContraComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  correo: string="";
  EnviarCorreo(){

  }

}
