import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent {
  htmlCode = '';
  cssCode = '';
  jsCode = '';

  constructor() { } 

  generarSalida(event: Event): void {
    console.log(this.htmlCode, this.cssCode, this.jsCode);
    const iframe = document.getElementById('salida') as HTMLIFrameElement;
    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

    const head = `
      <head>
        <style>${this.cssCode}</style>
        <script>${this.jsCode}</script>
      </head>
    `;

    const body = `
      <body>
        ${this.htmlCode}
      </body>
    `;

    iframeDoc!.open();
    iframeDoc!.write(head + body);
    iframeDoc!.close();
  }
}




