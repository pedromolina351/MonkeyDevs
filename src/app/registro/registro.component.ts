import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registro:boolean = true;
  planes:boolean = false;

  cambiar(){
    this.registro = false;
    this.planes = true;
  }

}
