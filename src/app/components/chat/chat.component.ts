import { Component, OnInit } from '@angular/core';
import { Mensaje } from 'src/app/interfaces/mensaje.interface';
import { ChatService } from 'src/app/providers/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit{

  mensaje = "";
  elemento : any;
  
  constructor(public _cs : ChatService) { 
    this._cs.cargarMensajes()
      .subscribe(()=>{
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;  
        }, 20);
        
      });  
  }

  ngOnInit(): void {
      this.elemento = document.getElementById("app_mensajes")
  }

  enviarMensaje(){
    console.log(this.mensaje);

    if (this.mensaje.length === 0) {
      return;
    }

    this._cs.agregarMensaje(this.mensaje)
        .then(() => this.mensaje = "")
        .catch((err) => console.error('Error al enviar',err));
  }

}
