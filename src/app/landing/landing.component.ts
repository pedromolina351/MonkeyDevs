import { Component } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css'],
})
export class LandingComponent {

  imagenes:any[]=[
    {
      name:'imagenHTML',
      img: '../../assets/img/ImagenHTML.jfif',
      desc: 'Programa en HTML'
    },
    {
      name:'imagenCSS',
      img: '../../assets/img/ImagenCSS.jpg',
      desc: 'Programa en CSS'
    },
    {
      name:'imagenJS',
      img: '../../assets/img/ImagenJS.jpg',
      desc: 'Programa en JavaScript'
    },
  ];

  constructor(private _config:NgbCarouselConfig){
    _config.interval = 2000;
  }
}
