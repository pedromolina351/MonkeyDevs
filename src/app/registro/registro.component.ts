import { Component } from '@angular/core';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  registro:boolean = true;
  planes:boolean = false;

  planSeleccionado:number = 0;

  cambiarPagina(){
    this.registro = false;
    this.planes = true;
  }

  cambiarPlan(plan:number){
    this.planSeleccionado = plan;
    for (let i = 1; i <= 3; i++) {
      if(i != plan){
        document.querySelector(`div.seleccionable:nth-child(${i})`)?.classList.remove('seleccionado');
      }
    }
  }

}
